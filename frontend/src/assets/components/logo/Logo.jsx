import React, {useEffect, useState } from 'react'
import './Logo.css'

const Logo = () => {
    const words = ["COLLABORATE", "CREATE", "COLAB"];
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 150; 
    const deletingSpeed = 100;


    useEffect(() => {
        const currentWord = words[wordIndex];

        const handleTyping = () => {
            if (isDeleting) {
                // deleting, aka going backwards one character at a time
                setText((prev) => prev.slice(0, prev.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    // need to loop circularly through the words array, cant just do wordIndex + 1
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                // typing, aka going forwards one character at a time
                setText((prev) => currentWord.slice(0, prev.length + 1));
                if (text === currentWord) {
                    // pause after finished typing out a word, set to 2000ms (2 seconds)
                    setTimeout(() => setIsDeleting(true), 1500);
                    return;
                }
            }
        }
        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed); 

        return () => clearTimeout(timeout); //cleanup function to clear the timeout if the component unmounts or before running the effect again

    }, [text, isDeleting, wordIndex, words]); //dependency array. basically telling react to run this effect when any of these values change

     


  return (
    <div className="logo">
      <span>
        {'('+text+')'}
      </span>
    </div>
  )
}

export default Logo
