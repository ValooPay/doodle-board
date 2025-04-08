import LilCloud from "./LilCloud"

const BunchOfClouds = () => {
    return <div>
        <LilCloud delay={-3} />
        <LilCloud delay={-6} />
        <LilCloud delay={-9} />
        <LilCloud delay={-12} />
        <LilCloud delay={0} />
    </div>
}

export default BunchOfClouds