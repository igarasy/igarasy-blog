import { comment } from 'postcss';
import React, { useRef, useState, useEffect } from 'react';

import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSucessMessage, setShowSucessMessage] = useState(false);
  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeDataElement = useRef();
  
  useEffect(() => {
    nameElement.current.value = window.localStorage.getItem('name');
    emailElement.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentElement.current;
    const { value: name } = nameElement.current;
    const { value: email } = emailElement.current;
    const { checked: storeData } = storeDataElement.current;


    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObject = { name, email, comment, slug };

    if (storeData) {
     window.localStorage.setItem('name', name);
     window.localStorage.setItem('email', email);
    } else {
     window.localStorage.removeItem('name', name);
     window.localStorage.removeItem('email', email);
    }

    submitComment(commentObject).then((res) => {
      setShowSucessMessage(true);
      setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">O que achou do post?</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentElement}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Deixe seu comentário"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameElement}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Digite seu nome"
          name="name"
        />
        <input
          type="text"
          ref={emailElement}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Digite seu e-mail"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            ref={storeDataElement}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="cursor-ponter ml-2 text-gray-500">
            Salvar o e-mail para futuros comentários
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">
          Todos os campos sãos obrigátórios
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
        >
          Comentar
        </button>
        {showSucessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comentário enviado para revisão
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
