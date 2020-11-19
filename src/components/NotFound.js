import React from 'react';
// import { useHistory } from 'react-router-dom';

export default function NotFound() {
  // const history = useHistory();

  // const redirectPage = () => {
  //   setTimeout(() => {
  //     history.push('/comidas');
  //   }, 30000);
  // };

  return (
    <div>
      <h5>Sorry, Not Found</h5>
      <img src="https://media.giphy.com/media/kGW0WGX4mJHXNvhgE6/giphy.gif" alt="Friends gif" width="85%" />
      {/* {redirectPage()} */}
    </div>
  );
}
