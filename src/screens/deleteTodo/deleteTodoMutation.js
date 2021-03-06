import { ConnectionHandler, commitMutation } from "relay-runtime";

import React, { useState } from "react";
import { environment } from "../../Environment";

const mutation = graphql`
  mutation deleteTodoMutation($input: deleteTodoInput!) {
    deleteTodo(input: $input) {
      status
      message
    }
  }
`;

function sharedUpdater(store, viewerId, id) {
  const viewerProxy = store.get(viewerId);
  const cnn = ConnectionHandler.getConnection(
    viewerProxy,
    "TodoPaginationContainer_todos"
  );
  ConnectionHandler.deleteNode(cnn, id);
}
export const deleteTodoMutation = (environment, viewerId, id) => {
  commitMutation(environment, {
    mutation,
    variables: { input: { id } },
    onCompleted: (res) => {
      console.log(res);
    },
    updater: (store) => {
      const payload = store.getRootField("deleteTodo");
      //const newEdge = payload.getLinkedRecord("");
      sharedUpdater(store, viewerId, id);
      if (status == "SUCESS") {
      }
    },
    optimisticUpdater: (store, viewerId, id) => {
      sharedUpdater(store, viewerId, id);

      // Get the todoProxy, and update the record
      const viewerProxy = store.get(viewerId);

      if (!viewerProxy) {
        throw new Error("Failed to retrieve todoProxy from store");
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return <div></div>;
};
