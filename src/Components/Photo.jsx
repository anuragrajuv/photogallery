import React,{useState} from 'react'

const Photo = ({photo}) => {

  
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        if(!liked){
          setLiked(true)
        };
        setLikes(likes + 1);
    }
  return (
    <div className='flex m-2 p-2 rounded'>
        <img src={photo.download_url} alt={photo.id} width="200px" />
        <div className='flex flex-col justify-center items-start'>
          <div>Author:{photo.author} 
            <span onClick={handleLike} className='text-blue-500'>{liked?<i class="fa-solid fa-thumbs-up"></i>:<i class="fa-regular fa-thumbs-up"></i>}</span>
            {likes>0 && <div>{likes} Likes</div>}
          </div>
          <div>
            
          </div>
        </div>
    </div>
  )
}

export default Photo;