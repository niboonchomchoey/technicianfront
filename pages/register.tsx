import React, { useState, useCallback, useRef, useEffect } from 'react'
import Layout from "../components/Layout/Layout"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { GetServerSideProps } from 'next'
import { CategoryInterface } from '../types/categoryType'
import { API_URL } from '../utils/urls'
import nookies from 'nookies'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'



interface MapInterface {
    lat: string | null
    lng: string | null
}

export default function Register({ categories, currentUser }: { categories: CategoryInterface[], currentUser: any }) {
    const [marker, setMarker] = useState<MapInterface | null>()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        if (!data) {
            return
        }

        let header = new Headers()
        header.append("Authorization", `Bearer ${currentUser.jwt}`)
        let formData = new FormData()
        let submitData = {
            contractor_name: data.contractor_name,
            contractor_address: data.contractor_address,
            contractor_description: data.contractor_description,
            contractor_facebook: data.contractor_facebook,
            contractor_line: data.contractor_line,
            contractor_website: data.contractor_website,
            categories: data.categories,
            user: currentUser.user.id,
            contractor_lat: data.map.lat,
            contractor_lng: data.map.lng
        }
        formData.append('data', JSON.stringify(submitData))

        Array.from(data.images).forEach((image: File) => {
            formData.append('files.contractor_images', image)
        })


        const response = await fetch(`${API_URL}/contractors`, {
            method: 'POST',
            body: formData,
            headers: header
        });
        const result = await response.json()
        router.push(`/contractor/${result.contractor_name}`)

    }

    useEffect(() => {
        setValue('map', marker)
    }, [marker])
    // Map
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyATfLPrgosbpGkCr1baP6wAD9GZYNHnWaY",
        // libraries: ['places']
    })
    const onMapClick = useCallback((e: any) => {
        setMarker(prevState => ({ ...prevState, lat: e.latLng.lat(), lng: e.latLng.lng() }))

        mapRef.current.panTo({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }, [])

    const mapRef = useRef()
    const onMapLoad = useCallback((map: any) => {
        mapRef.current = map
    }, [])

    const containerStyle = {
        width: '100%',
        height: '600px'
    };
    //Map
    return (
        <Layout>
            <div className="container mx-auto my-32">
                <div className="flex flex-col gap-10 dark:text-white">

                    <div className="dark:bg-bgDarkSecondary dark:text-white">
                        Username
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="dark:bg-bgDarkSecondary rounded-lg grid grid-cols-2 ">
                            <div className="dark:bg-bgDarkPrimary rounded-lg p-4 m-4 col-span-1">
                                <div className="flex justify-between">

                                    <h2 className=" font-bold text-xl">รายละเอียด</h2>
                                    {(errors.contractor_name || errors.contractor_address || errors.contractor_description || errors.categories) &&
                                        <span className="font-light text-red-500">กรุณากรอกข้อมูลให้ครบ</span>
                                    }
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_name" className="text-lg">ชื่อบริษัท, ชื่อช่าง หรือ หัวข้อประกาศ</label>
                                    <input
                                        className={`py-1 px-2 
                                        form_input
                                        transition-3
                                        ${errors.contractor_name && 'form_input__error'}
                                        
                                        `
                                        }
                                        type="text"
                                        {...register('contractor_name', { required: true, })}
                                        placeholder="ชื่อบริษัท, ชื่อช่าง หรือ หัวข้อประกาศ"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_address" className="text-lg">ที่อยู่</label>
                                    <input
                                        className={`py-1 px-2 
                                        form_input
                                        transition-3
                                        ${errors.contractor_address && 'form_input__error'}
                                        `}
                                        type="text"
                                        {...register('contractor_address', { required: true })}
                                        placeholder="ชื่อบริษัท, ชื่อช่าง หรือ หัวข้อประกาศ"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_description" className="text-lg">รายละเอียดของประกาศ</label>
                                    <textarea {...register('contractor_description', { required: true })} className={`py-1 px-2 
                                        form_input
                                        transition-3
                                        ${errors.contractor_description && 'form_input__error'}
                                        `} placeholder="รายละเอียดของประกาศ"></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contractor_description" className={`text-lg ${errors.categories && 'text-red-700'} transition-3`}>คุณสมบัติ</label>
                                    <div className="flex flex-wrap gap-4">
                                        {categories.map((category) => (
                                            <div className="flex " key={category.category_name}>
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id={category.category_name}
                                                        type="checkbox"
                                                        value={category.id}
                                                        className=" h-4 w-4 rounded checked:bg-primary bg-transparent "
                                                        {...register('categories', { required: true })}
                                                    />
                                                </div>
                                                <div className="ml-1 text-sm">
                                                    <label htmlFor={category.category_name} className=" dark:text-gray-400 text-base">
                                                        {category.category_name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="dark:bg-bgDarkPrimary rounded-lg p-4 m-4 col-span-1">
                                <div className="flex justify-between">
                                    <h2 className=" font-bold text-xl">ช่องทางการติดต่อ</h2>
                                    {errors.contractor_telephone &&
                                        <span className="font-light text-red-500">กรุณากรอกข้อมูลให้ครบ</span>
                                    }
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_telephone" className="text-lg">เบอร์โทร</label>
                                    <input
                                        id="contractor_telephone"
                                        className={`py-1 px-2 
                                       form_input
                                       transition-3
                                       ${errors.contractor_telephone && 'form_input__error'}
                                       `}
                                        type="text"
                                        name="contractor_name"
                                        placeholder="เบอร์โทร"
                                        {...register('contractor_telephone', { required: true })}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_facebook" className="text-lg">Facebook</label>
                                    <input
                                        id="contractor_facebook"
                                        className="py-1 px-2 
                                        form_input
                                        transition-3
                                        "
                                        type="text"
                                        name="contractor_name"
                                        placeholder="Facebook"
                                        {...register('contractor_facebook')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_name" className="text-lg">Line ID</label>
                                    <input
                                        id="contractor_line"
                                        className="py-1 px-2 
                                    form_input

                                        transition-3
                                        "
                                        type="text"
                                        name="contractor_name"
                                        placeholder="Line ID"
                                        {...register('contractor_line')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-4">
                                    <label htmlFor="contractor_name" className="text-lg">Website</label>
                                    <input
                                        className="py-1 px-2 
                                    form_input

                                        transition-3
                                        "
                                        type="text"
                                        name="contractor_name"
                                        placeholder="Line ID"
                                        {...register('contractor_website')}
                                    />
                                </div>
                            </div>
                            <div className="dark:bg-bgDarkPrimary rounded-lg p-4 m-4 col-span-1">
                                <div className="flex justify-between">
                                    <div className="flex ">
                                        <h2 className=" font-bold text-xl">อัพโหลดภาพ</h2>

                                    </div>

                                    <div className="relative cursor-pointer">
                                        <input type="file" multiple {...register('images', { required: true })}
                                            accept="image/png, image/jpeg"
                                            className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0" />
                                        <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    </div>

                                </div>
                                <div>
                                    {errors.images &&
                                        <span className="font-light text-red-500">กรุณาเลือกรูปภาพ</span>
                                    }
                                    {watch('images') &&

                                        <div className="grid grid-cols-4 gap-2">
                                            {Array.from(watch('images')).map((image: File, index: number) => {
                                                return (
                                                    <div className="col-span-1 relative h-32" key={image.name}>
                                                        <img src={URL.createObjectURL(image)} className="h-full w-full object-cover object-center" />
                                                        <span className="absolute top-0 right-0 z-10 text-blue" onClick={() => {
                                                            const currentImages = getValues("images");
                                                            const dt = new DataTransfer();
                                                            for (let i = 0; i < currentImages.length; i++) {
                                                                const clickedImages = currentImages[i];
                                                                if (index !== i) {
                                                                    dt.items.add(clickedImages);
                                                                }
                                                            }
                                                            setValue("images", dt.files);
                                                        }}>X</span>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    }
                                </div>

                            </div>
                            <div className="dark:bg-bgDarkPrimary rounded-lg p-4 m-4 col-span-1">
                                <h2 className="font-bold text-xl">สถานที่ตั้ง</h2> {errors.map && <span className="text-red-700">กรุณาเลือกสถานที่ตั้ง</span>}
                                {isLoaded &&
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={{
                                            lat: 13.736717,
                                            lng: 100.523186
                                        }}
                                        zoom={6}
                                        onLoad={onMapLoad}
                                        onClick={onMapClick}
                                        {...register('map', { required: true })}
                                    >
                                        {marker &&
                                            <Marker
                                                position={{ lat: marker.lat, lng: marker.lng }}
                                                icon={{
                                                    url: '/construction.svg',
                                                    scaledSize: new window.google.maps.Size(30, 30),
                                                    origin: new window.google.maps.Point(0, 0),
                                                    anchor: new window.google.maps.Point(15, 15)
                                                }}
                                            // onClick={() => {

                                            //     setSelected(marker)
                                            // }}
                                            />
                                        }
                                    </GoogleMap>
                                }
                            </div>

                        </div>
                        <div className=" flex justify-center items-center">
                            <button type="submit" className="w-1/3 py-3 px-4 rounded-3xl bg-primary dark:bg-darkPrimary dark:text-black  text-white font-bold hover:bg-primaryDarker dark:hover:bg-darkPrimaryDarker transition duration-300" >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { user } = nookies.get(ctx)
    const currentUser = JSON.parse(user)
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }


    const categories = await fetch(`${API_URL}/categories`).then((res) => res.json())
    return {
        props: {
            categories,
            currentUser
        }
    }
}