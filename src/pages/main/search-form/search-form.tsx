import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

import { Form, Field, Grid, Input } from 'src/components';
import { useDebounce } from 'src/hooks';

const VIDEO_NUMBER_OPTIONS = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

const PLAY_DURATION_OPTIONS = [
  // @TODO remove 2, 5 when finished
  { value: 2, label: '2s' },
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
  { value: 20, label: '20s' },
  { value: 30, label: '30s' },
];

const INITIAL_VALUES = {
  searchTitle: '',
  videosNumber: 10,
  playDuration: 5,
};

interface FormValues {
  searchTitle: string;
  videosNumber: number;
  playDuration: number;
}

interface Props {
  searchResults?: FormValues;
  handleSubmitForm: (values: FormValues) => void;
}

const AutoSearchHandler = () => {
  const { values, submitForm } = useFormikContext<FormValues>();
  const { withDebounce } = useDebounce(1000);

  React.useEffect(() => {
    if (values.searchTitle) {
      withDebounce(() => {
        submitForm();
      });
    }
  }, [values]);

  return null;
};

const SearchForm: React.FC<Props> = ({ handleSubmitForm }) => {
  return (
    <Form<FormValues>
      initialValues={INITIAL_VALUES}
      handleSubmit={(values) => {
        handleSubmitForm(values);
      }}
    >
      {() => (
        <React.Fragment>
          <Grid.Container>
            <Grid.Row mb={10}>
              <Grid.Col>
                <Field label="Video input" name="searchTitle" component={Input.Text} />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row mb={10}>
              <Grid.Col>
                <Field
                  label="Number of videos to play"
                  name="videosNumber"
                  component={Input.Dropdown}
                  options={VIDEO_NUMBER_OPTIONS}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row mb={10}>
              <Grid.Col>
                <Field
                  label="Each video plays for up to"
                  name="playDuration"
                  component={Input.Dropdown}
                  options={PLAY_DURATION_OPTIONS}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>

          <AutoSearchHandler />
        </React.Fragment>
      )}
    </Form>
  );
};

export default SearchForm;
