import LilCloud from "./LilCloud"
import React from "react"
import { memo } from "react"

const BunchOfClouds = () => {
    return <div style={{position: "fixed", zIndex: "-1"}}>
        <LilCloud delay={-3} />
        <LilCloud delay={-6} />
        <LilCloud delay={-9} />
        <LilCloud delay={-12} />
        <LilCloud delay={0} />
    </div>
}

export default memo(BunchOfClouds)