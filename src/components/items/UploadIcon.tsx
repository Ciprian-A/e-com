import { CoverImage } from '../svg/CoverImage';
import { ImageGallery } from '../svg/ImageGallery';


export function UploadIcon({type}: {type: 'image' | 'gallery'}) {
	return (
		<div className='relative '>
			{type === 'image' ? <CoverImage /> : <ImageGallery />}
		</div>
	)
}

