import { Globe } from 'lucide-react'
import React from 'react'

const About = () => {
    return (
        <div className="relative w-full min-h-screen">
            {/* Content Container */}
            <div className="relative px-4 sm:px-20 pt-20 pb-10 sm:pb-0 flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between items-start">
                {/* Top Left - Logo and EST */}
                <div className='flex items-center gap-2 w-full lg:w-1/2'>
                    <Globe className="w-8 sm:w-10 h-8 sm:h-10 text-white" strokeWidth={1} />
                    <span className='italic text-white text-2xl sm:text-3xl'>Aevion</span>
                    <div className='flex flex-col pl-8'>
                        <p className='uppercase text-white type-xs tracking-widest font-mono'>AI & Digital Engineering</p>
                        <p className='text-white type-xs tracking-widest font-mono'>EST. 2024</p>
                    </div>
                </div>

                {/* Content Grid - 2 rows, 2 columns */}
                <div className='grid grid-cols-2 gap-10 w-full lg:w-2/3 text-white pr-0 lg:pr-20'>
                    <div className='flex flex-col gap-4'>
                        {/* Fixed: was <h1> — wrong hierarchy in a card context */}
                        <h3 className='type-h4 tracking-tight'>AI Solutions & Custom SaaS</h3>
                        <span>——</span>
                        <p className='type-sm text-zinc-300 leading-relaxed'>Engineered for scale and performance. We build intelligent AI tools, full-stack SaaS platforms, and enterprise dashboards tailored to accelerate your business operations.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='type-h4 tracking-tight'>Modern Web Applications</h3>
                        <span>——</span>
                        <p className='type-sm text-zinc-300 leading-relaxed'>Crafted with cutting-edge tech stacks and fluid user experiences. We transform complex workflows into beautiful, high-converting digital products that wow your users.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='type-h4 tracking-tight'>Precision & Excellence</h3>
                        <span>——</span>
                        <p className='type-sm text-zinc-300 leading-relaxed'>Clean architecture, bulletproof code, and relentless optimization. Every product we deploy adheres to rigorous quality standards ensuring enterprise reliability.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='type-h4 tracking-tight'>Strategic Tech Partnership</h3>
                        <span>——</span>
                        <p className='type-sm text-zinc-300 leading-relaxed'>Beyond initial development, we partner closely with founders and executive teams to iteratively evolve, scale, and future-proof their digital infrastructure.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About