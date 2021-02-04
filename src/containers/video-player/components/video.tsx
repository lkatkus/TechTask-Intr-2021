import React from 'react';

interface Props {
  data: any;
}

const Video: React.FC<Props> = ({ data }) => {
  const videoFile = data.video_files[0];
  const videoPicture = data.video_pictures[0];

  return (
    <video
      key={videoFile.id}
      muted
      autoPlay
      width="320"
      height="240"
      style={{ objectFit: 'cover' }}
      poster={videoPicture.picture}
    >
      <source src={videoFile.link} type={videoFile.file_type} />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
};

export default Video;
