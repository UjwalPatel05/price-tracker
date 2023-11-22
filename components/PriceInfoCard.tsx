import Image from 'next/image'
import React from 'react'

type Props = {
    title:string,
    iconSrc:string,
    value:string,
    borderColor:string
}

const PriceInfoCard = ({title,iconSrc,value,borderColor}:Props) => {
  return (
    <div className={`price-info_card border-l-[${borderColor}]`}>
        <p className='text-base text-black-100'>{title}</p>
        <div className='flex gap-1'>
            <Image height={24} src={iconSrc}  alt={title} width={24} />
            <p className='text-xl font-bold text-secondary'>{value}</p>
            </div>
    </div>
  )
}

export default PriceInfoCard