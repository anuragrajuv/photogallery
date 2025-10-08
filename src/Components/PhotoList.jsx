import React, { useEffect, useState ,useCallback } from 'react';
import Photo from './Photo';
import InfiniteScroll from 'react-infinite-scroll-component';

const PhotoList = () => {

  const fetchURLS = ["https://picsum.photos/v2/list?page=1",
    "https://picsum.photos/v2/list?page=2",
    "https://picsum.photos/v2/list?page=3"];
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);



  const fetchData = useCallback (async () => {
    if (page >= fetchURLS.length) {
      setHasMore(false);
      return;
    }
    try {
      const res = await fetch(fetchURLS[page]);
      const data = await res.json();
      setPhotos((prevPhotos)=>[...prevPhotos, ...data]);
      setPage((prevPage)=>prevPage + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [page, fetchURLS]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading photos...</p>;

  return (
    <div>
        <InfiniteScroll
          dataLength={photos.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4 className='text-center mt-4'>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>End</b>
            </p>
          }
        >
          {photos.map(photo => (
          <Photo key={photo.id} photo={photo} />
        ))}
        </InfiniteScroll>
    </div>
  )
}

export default PhotoList;