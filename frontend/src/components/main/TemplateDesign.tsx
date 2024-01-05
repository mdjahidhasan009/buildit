const TemplateDesign = () => {
    return (
        <div>
            {
                [1, 2, 3, 4].map((item: any, index: number) => (
                    <div
                        className='group w-full rounded-md overflow-hidden bg-[#ffffff12] cursor-pointer'
                    >
                        <img
                            className="w-full f-full rounded-md overflow-hidden"
                            src='http://localhost:5173/project.jpg'
                            alt='alt'
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default TemplateDesign;