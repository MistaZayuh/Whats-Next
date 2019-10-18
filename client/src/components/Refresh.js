import React, {useEffect} from "react";
import {AuthConsumer} from "../providers/AuthProvider";

const Refresh = (props) => {
  useEffect(() => {
    props.history.goBack();
  });
  return (
    <div>You weren't supposed to see this</div>
  )
};

const ConnectedRefresh = (props) => (
  <AuthConsumer>
    {auth =>
      <Refresh {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedRefresh;