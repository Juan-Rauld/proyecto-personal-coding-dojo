/* eslint-disable react/prop-types */
// Asegúrate de incluir algo de CSS para el modal y su contenedor en tu archivo de estilos
import { Link } from 'react-router-dom';
import './PostComp.css';

const Post = ({ post, onLike, toggleModal, isModalOpen }) => {
  return (
    <div className='grid grid-cols-3 gap-4 grid-rows-[auto,1fr] relative'>
      <div className='grid col-span-1 justify-items-end'>
        <Link to={`/user_profile/${post.author._id}`} className='justify-items-end'>{post.author.firstName}</Link>
      </div>
      <p className='col-span-2 w-full card-shadow rounded-2xl p-5 border'>{post.content}</p>
      <div className='col-span-1 col-start-2 overflow-auto'>
        <button className='mx-2 inline-block py-2 text-sm font-medium px-4 rounded-lg ml-auto bg-teal-200 text-[#124E4A]' onClick={(event) => onLike(post._id, event)}>Like</button>
        <p className='inline-block cursor-pointer' onClick={() => toggleModal(post._id)}>{post.likes.length} likes</p>
      </div>
      {isModalOpen && (
        <div className='modal-container'>
          <div className="modal-content">
            <h2>Liked by:</h2>
            <ul>
              {post.likes.map((like, index) => (
                <li key={index} className="list-none">
                  <Link to={`/user_profile/${like._id}`} className="text-blue-500 hover:text-blue-800">{like.firstName} {like.lastName}</Link>
                </li>
              ))}
            </ul>
            <button className="py-2 text-sm font-medium px-4 rounded-lg ml-auto bg-teal-600 text-[#CBFBF1]" onClick={() => toggleModal(post._id)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
