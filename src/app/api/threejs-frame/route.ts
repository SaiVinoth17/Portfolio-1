import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id") || searchParams.get("file") || "";

    // Remove .html suffix if provided
    id = id.replace(/\.html$/i, "").trim();

    // Sanitize id: only allow valid alphanumeric, hyphens, and underscores
    if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      return new NextResponse("Invalid example identifier.", { status: 400 });
    }

    const targetUrl = `https://threejs.org/examples/${id}.html`;
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 86400 }, // Cache on server for 24h
    });

    if (!res.ok) {
      return new NextResponse(`Failed to load Three.js example (HTTP ${res.status}).`, {
        status: res.status,
      });
    }

    let html = await res.text();

    // 1. Completely remove any <div id="info">...</div> and similar credit blocks
    html = html.replace(/<div\s+id=["']info["'][\s\S]*?<\/div>/gi, "");
    html = html.replace(/<div\s+id=["']notSupported["'][\s\S]*?<\/div>/gi, "");
    html = html.replace(/<div\s+id=["']description["'][\s\S]*?<\/div>/gi, "");

    // 2. Prepare anti-credits styles & runtime cleaner
    const antiCreditsHeadInjection = `
      <base href="https://threejs.org/examples/">
      <style>
        #info,
        #info *,
        #notSupported,
        #description,
        .info,
        [id*="info"],
        [class*="info"],
        footer,
        .credits {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background-color: #000 !important;
        }
      </style>
      <script>
        (function() {
          function purgeCredits() {
            var elIds = ['info', 'notSupported', 'description'];
            for (var i = 0; i < elIds.length; i++) {
              var el = document.getElementById(elIds[i]);
              if (el && el.parentNode) {
                el.parentNode.removeChild(el);
              }
            }
            var allLinks = document.querySelectorAll('a[href*="threejs.org"], a[href*="pauldebevec"], a[href*="github.com"]');
            for (var j = 0; j < allLinks.length; j++) {
              var parent = allLinks[j].closest('div');
              if (parent && parent.innerText && (
                parent.innerText.toLowerCase().indexOf('three.js') !== -1 ||
                parent.innerText.toLowerCase().indexOf('skybox') !== -1 ||
                parent.innerText.toLowerCase().indexOf('effects') !== -1
              )) {
                if (parent.parentNode) {
                  parent.parentNode.removeChild(parent);
                }
              }
            }
          }
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', purgeCredits);
          } else {
            purgeCredits();
          }
          window.addEventListener('load', purgeCredits);
          var observer = new MutationObserver(purgeCredits);
          observer.observe(document.documentElement, { childList: true, subtree: true });
        })();
      </script>
    `;

    // 3. Inject base tag and anti-credit styling into <head>
    if (/<head>/i.test(html)) {
      html = html.replace(/<head>/i, `<head>${antiCreditsHeadInjection}`);
    } else {
      html = `${antiCreditsHeadInjection}${html}`;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err: any) {
    console.error("[Three.js Frame Proxy Error]:", err);
    return new NextResponse("Internal Server Error loading Three.js example.", {
      status: 500,
    });
  }
}
