const Post = require('../models/posts');

const posts = {
  async getPosts(req, res) {
    const { keyword, sortby } = req.query;
    const search = keyword ? { content: new RegExp(`${keyword}`) } : {};
    const sort = sortby === 'old' ? 1 : -1;
    const posts = await Post.find(search).sort({ createAt: `${sort}` });
    res.status(200).json({ status: 'success', posts });
  },
  async createPost(req, res) {
    try {
      const data = req.body;
      if (data.content !== '') {
        let { name, avatar, content, image, createdAt } = data;
        const newPost = await Post.create({
          name,
          avatar,
          content,
          image,
          createdAt,
        });
        res.status(200).json({ status: 'success', newPost });
      } else {
        res.status(400).json({ status: 'error', message: 'content 必填' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: '資料錯誤' });
    }
  },
  async deletePosts(req, res) {
    const posts = await Post.deleteMany({});
    res.status(200).json({ status: 'success', posts });
  },
  async deleteOnePost(req, res) {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      res.status(400).json({ status: 'error', message: '查無此 ID' });
      return;
    }
    const posts = await Post.findByIdAndDelete(id);
    res.status(200).json({ status: 'success', posts });
  },
  async editPost(req, res) {
    try {
      const data = req.body;
      const id = req.params.id;
      console.log(id);
      if (data.content !== '') {
        let { content, image, likes } = data;
        const posts = await Post.findByIdAndUpdate(id, {
          content,
          image,
          likes,
        });
        res.status(200).json({ status: 'success', posts });
      } else {
        res.status(400).json({ status: 'error', message: 'content 必填' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: '資料錯誤' });
    }
  },
};

module.exports = posts;
