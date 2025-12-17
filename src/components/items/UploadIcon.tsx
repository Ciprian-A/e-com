import { ImageGallery } from '../svg/ImageGallery';
import { SingleImage } from '../svg/SingleImage';


export function UploadIcon({type}: {type: 'image' | 'gallery'}) {
	return (
		<div className='relative '>
			{type === 'image' ? <SingleImage /> : <ImageGallery />}
		</div>
	)
}

