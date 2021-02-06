import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getFetchItems,
  getDeleteItem
} from '../action/ActionCreators';

import Error from './Error';
import Loader from './Loader';
import pencil from '../assets/pencil.svg';
import miniLoader from '../assets/miniLoader.svg';
import cross from '../assets/cross.svg';

const List = ({history}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getFetchItems());
  }, [dispatch])

  const editItem = (id) => {
    history.push(`/services/${id}`)
  }

  const deleteItem = (id) => {
    dispatch(getDeleteItem(id));
  }

  const {loading, error, items} = useSelector(store => store.list);
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='List'>
      {items.map(item => (
        <div className='ListItem' key={item.id}>
        <p>{item.name}: {item.price} руб.</p>
        <div className='BtnWrap'>
          <button
           className={`Btn BtnEdit ${item.loading ? 'btnDisabled' : ''}`}
           disabled={item.loading}
           onClick={() => {editItem(item.id)}}
           >
            <img src={pencil} alt='pencel' />
          </button>
          <button
           className={`Btn BtnDelete ${item.loading ? 'btnDisabled' : ''}`}
           disabled={item.loading}
           onClick={() => {deleteItem(item.id)}}
           >
            <img
             className={item.loading ? 'disabled' : ''}
             src={item.loading ? miniLoader: cross}
             alt='cross'
            />
            </button>
        </div>
      </div>
      ))}
    </div>
  )
}

export default List;