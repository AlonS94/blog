import store from '../redux';

const { profile } = store.getState();
const token = profile ? profile.token : null;

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Token ${token}`,
};

export default class DataAPI {
  url = 'https://conduit.productionready.io/api';

  bodyForRequest = async (urls, body) => {
    const resures = await fetch(`${this.url}${urls}`, body);

    if (resures.status === 422) {
      return resures.json();
    }

    if (!resures.ok) {
      throw new Error(`Error ${resures.status}`);
    }
    const result = await resures.json();
    return result;
  };

  getListArticles = async (offset = 0) => {
    if (!token) return this.bodyForRequest(`/articles/?offset=${offset}`);
    const respons = await this.bodyForRequest(`/articles/?offset=${offset}`, {
      headers,
    });
    return respons;
  };

  getArticle = async (slug) => {
    if (!token) return this.bodyForRequest(`/articles/${slug}`);
    const respons = await this.bodyForRequest(`/articles/${slug}`, {
      headers,
    });
    return respons;
  };

  onRegister = async (data) => {
    const respons = await this.bodyForRequest('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: data,
      }),
    });
    return respons;
  };

  onAuthentication = async (email, password) => {
    const respons = await this.bodyForRequest(`/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    return respons;
  };

  getCurrentUser = () => this.bodyForRequest(`/user`);

  onUpdateUSer = async (body) => {
    const respons = await this.bodyForRequest(`/user`, {
      method: 'PUT',
      headers,

      body: JSON.stringify({
        user: body,
      }),
    });
    return respons;
  };

  onCreateArticle = async (body) => {
    const respons = await this.bodyForRequest(`/articles`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        article: body,
      }),
    });
    return respons;
  };

  onUpdateArticle = async (body, slug) => {
    const respons = await this.bodyForRequest(`/articles/${slug}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        article: body,
      }),
    });
    return respons;
  };

  onDeleteArticle = async (slug) => {
    this.bodyForRequest(`/articles/${slug}`, {
      method: 'DELETE',
      headers,
    });
  };

  onFavoriteArticle = async (slug) => {
    const respons = await this.bodyForRequest(`/articles/${slug}/favorite`, {
      method: 'POST',
      headers,
    });
    return respons;
  };

  onUnfavoriteArticle = async (slug) => {
    const respons = await this.bodyForRequest(`/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers,
    });
    return respons;
  };
}
