import React, { useState } from 'react';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Image from 'next/image'
import { ImageInterface } from '../../types/imageType';
interface IProps {
    images: ImageInterface[]
}
export default function Gallery({ images }: IProps) {
    const [imageClicked, setImageClicked] = useState<boolean>(false)

    return (
        <SimpleReactLightbox>
            <SRLWrapper>
                <div className={`grid grid-cols-1  ${images.length <= 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2'}  gap-4 mx-4`}>
                    <a href={images[0].url}>
                        <Image src={images[0].url}
                            layout="responsive"
                            width={1200}
                            height={800}
                            objectFit="cover"
                            objectPosition="center"
                            className="h-full"

                            onClick={() => { setImageClicked }} />
                    </a>
                    {images.length >= 1 &&
                        <div className={`grid ${images.length <= 2 ? 'grid-cols-1' : 'grid-cols-2'}    gap-2`}>
                            {images.slice(1).map((image) => (
                                <a href={image.url} key={image.name}>
                                    <Image className="  object-cover" src={image.url} layout="intrinsic" width={1200} height={800} key={image.url} />
                                </a>
                            ))}
                        </div>
                    }
                </div>
            </SRLWrapper>
        </SimpleReactLightbox>
    )
}