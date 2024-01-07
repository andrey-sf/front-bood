export default function Footer() {
    return (
        <div>
            <img
                loading="lazy"
                src="/footer.png"  // Replace with the actual image path
                className="w-full object-cover object-center"
                alt="Footer Image"
            />
            <footer className='bg-yellow-400 h-16'>
                <div className='h-full px-2'>
                    <div className='flex items-center justify-center h-full'>
                        <p className="text-neutral-800 mt-2 text-sm">
                            &copy; 2023 b00d. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}


