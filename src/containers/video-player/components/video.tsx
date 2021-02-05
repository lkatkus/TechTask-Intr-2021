import React from 'react';

import { Video as VideoType } from 'src/api/pexels';

interface Props {
  data: VideoType;
  handleCanPlay: () => void;
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ data, handleCanPlay }, ref) => {
  const videoFile = data?.video_files[0];
  const videoPicture = data?.video_pictures[0];

  return (
    <video
      ref={ref}
      key={`${videoFile.id}-${Date.now()}`}
      muted
      autoPlay
      // @TODO update video sizes
      width="320"
      height="240"
      style={{ objectFit: 'cover' }}
      poster={videoPicture.picture}
      onCanPlayThrough={() => {
        handleCanPlay();
      }}
    >
      <source src={videoFile.link} type={videoFile.file_type} />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
});

Video.displayName = 'Video';

export default Video;
