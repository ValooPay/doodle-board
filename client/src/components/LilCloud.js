const LilCloud = ({delay}) => {

    const randomizedValues = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return <div className="cloud transparency animationBasicsCloud" style={{animationDelay:`${delay}s`, top: `${randomizedValues(0, 75)}dvh`, animationDuration: `${randomizedValues(18, 30)}s`, scale: `${randomizedValues(45, 70)}%`}}></div>
}

export default LilCloud