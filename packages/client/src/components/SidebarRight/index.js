import React, { useEffect, useRef } from 'react';
import IconFlip from '../../images/icon-flip.svg';
import IconTrash from '../../images/icon-trash.svg';
import IconArrowUp from '../../images/icon-arrow-up.svg';
import { AppContext } from '../../contexts/App';

const SidebarRight = () => {
  // We need the dispatch function, but not the context state for this component.
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = React.useContext(AppContext);

  //
  // Open WebSocket connection
  //
  // We need to open the socket in this component which is loaded on a client side only page,
  // so that static rendered Gatsby page has access to the WebSocket browser API.
  //
  // We also need to create null ref and then load the websocket connection inside of an
  // effect hook, otherwise the connection will be opened and closed everytime the component
  // renders. Without doing this, the websocket connection will fail after 10s of seconds
  // of usage because of browser performance issues.
  //
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8081/ws');
    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }, []);

  return (
    <div className="w-2/12 relative">
      <div className="mx-12 relative">
        <div className="flex flex-col justify-center h-screen">
          <div
            role="button"
            onMouseDown={() => {
              dispatch({ type: 'FLIP_GRID' });
            }}
            onMouseUp={() => {
              dispatch({ type: 'FLIP_RESET' });
            }}
            className="text-4xl text-center border-2 rounded-2xl my-3 mt-28 p-3 text-white relative"
          >
            <IconFlip className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Flip
          </div>
          <div
            role="button"
            onMouseDown={() => {
              dispatch({ type: 'CLEAR_GRID' });
            }}
            onMouseUp={() => {
              dispatch({ type: 'CLEAR_RESET' });
            }}
            className="text-4xl text-center border-2 rounded-2xl my-3 p-3 text-white relative"
          >
            <IconTrash className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Clear
          </div>
        </div>
        <div
          className="absolute w-full bottom-20 text-4xl text-center border-2 rounded-2xl p-3 text-blue bg-white"
          role="button"
          onMouseDown={() => {
            // Trigger share grid in reducer, and pass the WebSocket connection, for sharing
            // the data with the WaterWall server.
            dispatch({ type: 'SHARE_GRID', payload: { socket: ws.current } });
          }}
        >
          <IconArrowUp
            className="absolute left-5 bottom-2 float-left mr-4"
            style={{ height: '45px' }}
          />
          Share
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
