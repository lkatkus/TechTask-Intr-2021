import React from 'react';

import { Video as VideoType } from 'src/api/pexels';

interface Props {
  data: VideoType;
  handleCanPlay: () => void;
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ data, handleCanPlay }, ref: any) => {
  const videoFile = data?.video_files[0];
  const videoPicture = data?.video_pictures[0];

  React.useEffect(() => {
    const currentRef = ref.current;

    // Cleanup to stop buffering unmounted videos
    return () => {
      currentRef.src = '';
      currentRef.pause();
    };
  });

  return (
    <video
      ref={ref}
      data-testid={videoFile.id}
      key={`${videoFile.id}-${Date.now()}`}
      muted
      autoPlay
      // @TODO update video sizes
      width="100%"
      height="auto"
      style={{ objectFit: 'cover' }}
      poster={videoPicture.picture}
      onCanPlayThrough={handleCanPlay}
    >
      <source
        data-testid={`${videoFile.id}-source`}
        src={videoFile.link}
        type={videoFile.file_type}
      />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
});

Video.displayName = 'Video';

export default Video;
