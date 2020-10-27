import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

const RenderAds = () => {

    const ads = useSelector(state => state.ads)
    const [randomAd, setRandomAd] = useState([])

    useEffect(() => {

        setRandomAd(ads[Math.floor(Math.random() * ads.length)])
        const interval = setInterval(() => {
            setRandomAd(ads[Math.floor(Math.random() * ads.length)])
        }, 10000)
        
        return () => clearInterval(interval)
    }, [ads])

    return (<div>
        <Header as='h3' color={'orange'}>Sponsored</Header>
        <Image src={randomAd ? randomAd.picture : null}
            as='a'
            href={randomAd ? randomAd.href : null}
            target='_blank'
            style={{ transition: '.35s ease-in-out' }}
        />
    </div>)
}

export default RenderAds
