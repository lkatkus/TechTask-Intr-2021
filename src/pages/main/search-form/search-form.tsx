import React from 'react';

import { Grid, Input, VideoPlayerConfig } from 'src/components';
import { useDebounce } from 'src/hooks';

const VIDEO_NUMBER_OPTIONS = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

const PLAY_DURATION_OPTIONS = [
  { value: 10, label: '10s' },
  { value: 20, label: '20s' },
  { value: 30, label: '30s' },
];

interface FormValues {
  searchTitle: string;
  videosNumber: number;
  playDuration: number;
}

interface Props {
  availableVideos: number;
  playbackConfig: VideoPlayerConfig;
  handleNewSearch: (values: FormValues) => void;
  handleNewConfig: (values: FormValues) => void;
}

const SearchForm: React.FC<Props> = ({
  availableVideos,
  playbackConfig,
  handleNewSearch,
  handleNewConfig,
}) => {
  const { withDebounce } = useDebounce(500);
  const [currentSearch, setCurrentSearch] = React.useState('');
  const [searchParams, setSearchParams] = React.useState<FormValues>({
    searchTitle: '',
    videosNumber: playbackConfig.videosNumber,
    playDuration: playbackConfig.playDuration,
  });

  React.useEffect(() => {
    if (searchParams.searchTitle !== currentSearch) {
      // To handle video fetching with debounce on title change
      setCurrentSearch(searchParams.searchTitle);

      withDebounce(() => {
        handleNewSearch(searchParams);
      });
    } else if (
      // To handle playback config changes
      searchParams.playDuration !== playbackConfig.playDuration ||
      searchParams.videosNumber !== playbackConfig.videosNumber
    ) {
      handleNewConfig(searchParams);
    }
  }, [searchParams, handleNewSearch, currentSearch]);

  // To handle number of videos played, when results are available
  React.useEffect(() => {
    if (availableVideos && searchParams.videosNumber !== availableVideos) {
      setSearchParams({ ...searchParams, videosNumber: availableVideos });
    }
  }, [availableVideos]);

  return (
    <Grid.Container>
      <Grid.Row></Grid.Row>
      <Grid.Row mb={20}>
        <Grid.Col>
          <Input.Text
            name="searchTitle"
            label="Video title"
            placeholder="Enter video title"
            value={searchParams?.searchTitle}
            onChange={(e) => {
              setSearchParams({ ...searchParams, searchTitle: e.target.value });
            }}
          />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row mb={20}>
        <Grid.Col>
          <Input.Dropdown
            name="videosNumber"
            label="Number of videos to play"
            value={searchParams?.videosNumber}
            options={VIDEO_NUMBER_OPTIONS}
            onChange={(e) => {
              setSearchParams({ ...searchParams, videosNumber: Number(e.target.value) });
            }}
          />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row mb={20}>
        <Grid.Col>
          <Input.Dropdown
            name="playDuration"
            label="Each video plays for up to"
            value={searchParams?.playDuration}
            options={PLAY_DURATION_OPTIONS}
            onChange={(e) => {
              setSearchParams({ ...searchParams, playDuration: Number(e.target.value) });
            }}
          />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default SearchForm;
