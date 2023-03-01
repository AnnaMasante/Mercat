import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'


const Standard = () => {
    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }


    const handleSubmit = (files: any[], allFiles: any[]) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (

        <>
            <h1>Ajoutez des photos</h1>
            <h2>Ne vous inquiétez pas vous pourrez modifier l'ordre plus tard</h2>
            <p>BBBB</p>
            <Dropzone
                getUploadParams={getUploadParams}
                onSubmit={handleSubmit}
                styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
            />
        </>

    )
}

export default Standard
