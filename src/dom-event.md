   /*
    const checkNode = function(addedNode) {
        //const nodeTypes = [1,3,4,7,11]
        if (addedNode.nodeType === 1 && addedNode.tagName === 'MY-TAG') {
          //addedNode.src = optimizeSrc(addedNode.src)
        }
    }
    */



    //function (mutations) {               
        /*
        for (var i = 0; i < mutations.length; i++){
          for (var j=0; j < mutations[i].addedNodes.length; j++){
            checkNode(mutations[i].addedNodes[j]);
          }
        }
        */
      //}
    //const streamAdapter = new CreateAdapter();
    //const observer = new MutationObserver(streamAdapter.emit);
    //streamAdapter.observe = observer.observe


       /* These are the modifications: */
    /*
    history.pushState = (f => function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.replaceState);
    */