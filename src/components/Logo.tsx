import React from 'react'
import Link from 'next/link'
import shoppyLogo from '../../public/logoLight.png'
import Image from 'next/image'

const Logo = () => {
	return (
		<div>
			<Link
				href='/'
				className='text-2xl font-bold hover:bg-gray-900 cursor-pointer mx-auto flex items-center gap-2'>
				<Image src={shoppyLogo} alt='shoppy logo' width={90} />
			</Link>
		</div>
	)
}

export default Logo
