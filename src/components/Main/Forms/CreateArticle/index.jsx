import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import actionsDispatch from '../../../../redux/actions';
import DataAPI from '../../../../dataAPI';
import formsWrapper from '../../../../assets/formsWrapper';
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import Tags from './Tags';
import './CreateArticle.scss';
import ErrorMessage from '../ErrorMessage';

const CreateArticle = ({ getArticles, heading, article, edit, getArticle, history }) => {
  const [tags, setTags] = useState([]);

  const { title, description, body, tagList, slug } = article;

  useEffect(() => {
    if (edit) setTags(tagList);
  }, [edit, tagList]);

  const API = new DataAPI();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  /* удаление или по имени или по индексу. У каждого подхода есть минусы. Решил так сделать */
  const delTag = (tag) => {
    setTags(() => {
      const newTags = tags.filter((elem) => elem !== tag);
      setTags(newTags);
    });
  };

  /* при желании можно еще еррор показывать наверн */
  const addTag = (value) => {
    if (tags.indexOf(value) !== -1 || !value) return;
    setTags(() => {
      const newTags = [...tags, value];
      setTags(newTags);
    });
  };

  const createArticle = async (Newbody) => {
    await API.onCreateArticle(Newbody).then((elem) => {
      getArticles();
      getArticle(elem.article.slug);
      history.push(`/articles/${elem.article.slug}`);
    });
  };

  const updateArticle = async (Newbody) => {
    await API.onUpdateArticle(Newbody, slug).then((elem) => {
      setTags(elem.article.tagList);
    });
    getArticle(slug);
  };

  const submitForm = (event) => {
    const Newbody = { ...event, tagList: tags };
    if (edit) {
      updateArticle(Newbody);
      history.push(`/articles/${slug}`);
    } else createArticle(Newbody);
  };

  return (
    <>
      <h2>{heading}</h2>
      <form onSubmit={handleSubmit(submitForm)} action="">
        <Input
          register={register}
          options={{ required: true }}
          className={errors.title ? 'error' : null}
          caption="Title"
          type="text"
          name="title"
          values={edit ? title : null}
        />
        {errors.title && <ErrorMessage type={errors.title?.type} />}
        <Input
          register={register}
          options={{ required: true }}
          className={errors.description ? 'error' : null}
          caption="Short description"
          type="text"
          name="description"
          placeholder="Title"
          values={edit ? description : null}
        />
        {errors.description && <ErrorMessage type={errors.description?.type} />}
        <label className="marginForBodyText">
          <p>Text</p>
          <textarea
            name="body"
            placeholder="Text"
            rows="10"
            className={
              errors.body ? 'CreateArticle__bodyText CreateArticle__bodyText_error' : 'CreateArticle__bodyText'
            }
            {...register('body', { required: true })}
            defaultValue={edit ? body : null}
          />
        </label>
        {errors.body && <ErrorMessage type={errors.body?.type} required />}
        <Tags tags={tags} setTags={setTags} delTag={delTag} addTag={addTag} />
        <SubmitBtn className="CreateArticle__submit" name="Send" />
      </form>
    </>
  );
};

CreateArticle.propTypes = {
  getArticles: PropTypes.func,
  heading: PropTypes.string,
  edit: PropTypes.bool,
  getArticle: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
  }),
};

CreateArticle.defaultProps = {
  getArticles: () => {},
  heading: '',
  edit: false,
  getArticle: () => {},
  history: {},
  article: {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  article: state.article,
});

export default connect(mapStateToProps, actionsDispatch)(withRouter(formsWrapper(CreateArticle, ['CreateArticle'])));
