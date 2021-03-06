export default class Preloader{
    static preLoadImages({images,completed}){
        const promises = images.map(imagePath => Preloader.preLoadImage({imagePath}));

        Promise.all(promises).then(completed);
    }
    static preLoadImage({imagePath}){
        return new Promise((res,rej)=>{
            let image = new Image();
            image.src= imagePath;
            image.onload=res;
        })

    }
}
