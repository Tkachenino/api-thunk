import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {
  getFetchItem,
  saveChangeItem,
  canceChangeItem,
  changeItemField
} from '../action/ActionCreators';
import miniLoader from '../assets/miniLoader.svg';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Item = ({history, match}) => {
  const dispatch = useDispatch();
  const {loading, miniLoading, error, item} = useSelector(store => store.item);

  useEffect(() => {
    dispatch(getFetchItem(match.params.id));
  }, [dispatch, match.params.id])

  const onInputHandler = (e) => {
    const {name, value} = e.target;
    dispatch(changeItemField(name, value))
  }

  const cancelEdit = () => {
    history.push('/services');
    dispatch(canceChangeItem())
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveChangeItem(item));
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <form className='Form' onSubmit={onSubmitHandler}>
      <div className='InputWrap'>
        <label htmlFor='name'>Название</label>
        <input id='name' name='name' disabled={miniLoading} value={item.name} onChange={onInputHandler} />
      </div>
      <div className='InputWrap'>
        <label htmlFor='price'>Название</label>
        <input id='price' name='price' disabled={miniLoading} value={item.price} onChange={onInputHandler} />
      </div>
      <div className='InputWrap'>
        <label htmlFor='content'>Название</label>
        <input id='content' name='content' disabled={miniLoading} value={item.content} onChange={onInputHandler} />
      </div>
      <div className='FormBtnWrap'>
        <button
         className={`Btn ${miniLoading ? 'btnDisabled' : ''}`}
         type='button'
         disabled={miniLoading}
           onClick={cancelEdit}
          >
            Отмена
          </button>
        <button
         className={`Btn ${miniLoading ? 'btnDisabled' : ''}`}
         disabled={miniLoading}
         type='submit'
         >
           {miniLoading ? 
           <img
             className='disabled'
             src={miniLoader}
             alt='loader'
            /> : 
            'Сохранить'}
            </button>
      </div>
    </form>
  )
}

export default Item;