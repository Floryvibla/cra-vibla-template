import React, { useState, useEffect, useRef } from "react"

export const useOutside = () => {
    const ref = useRef(null)
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const [outside, setOutside] = useState({
        open: false,
        ref: ref,
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutside({...outside, open: !outside.open})
                console.log(outside.open);
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside );
        }
    }, [ref]); // Empty array ensures that effect is only run on mount
    return outside;
}