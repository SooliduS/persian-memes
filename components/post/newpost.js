import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import styles from './newpost.module.css'
import Chip from '@mui/material/Chip';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Switch from '@mui/material/Switch';



const NewPost = ({ setNewPostAdded }) => {

    const [caption, setCaption] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')
    const [error, setError] = useState('')
    const [checked, setChecked] = useState(false)
    const [file, setFile] = useState('')

    const axiosPrivate = useAxiosPrivate()

    const handleAddPost = async () => {
        if (!title || !caption) return setError('Please fill title and caption')
        setError('')
        try {
            const response = await axiosPrivate.post('/newpost', {
                title,
                caption,
                tags,
                private: checked
            })
            console.log(response.data)
            setCaption('')
            setTitle('')
            setTags([])
            setNewTag('')
            setError('')
            setChecked(false)
            setNewPostAdded(true)
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddFile = async (e) => {
        const file = e.target.files
    }

    const handleChecked = () => {
        setChecked(!checked)

    }

    const handleAddTag = (e) => {
        e?.preventDefault()

        if (newTag.length > 3) {
            setTags([newTag, ...tags])
            setNewTag('')
            return
        } else return
    }

    const handleDeleteTag = (e) => {
        setTags(tags.filter(tag => tag !== e.target.parentElement.children[0].innerHTML))
    }

    const handleKeyDown = (e) => {
        const keys = "&$+,:;/=?@#<>[]{}|^% "
        const keyCode = e.key
        if (e.key === 'Enter') return handleAddTag()
        if (!keys.includes(keyCode)) return
        setNewTag('')
        return handleAddTag()


    }


    return (
        <section className={styles.container}>
            {error && <p className={styles.error}>{error}</p>}
            <form >
                <input className={styles.title} placeholder='title...' value={title} onChange={e => setTitle(e.target.value)} />
                <input type='file' onChange={handleAddFile} />
                <TextareaAutosize
                    className={styles.textarea}
                    aria-label="new post"
                    placeholder="Tell a joke ... "
                    style={{ width: 400 }}
                    minRows={3}
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                />
            </form >

            <div>
                <label htmlFor="private post">Private</label>
                <Switch

                    id='private post'
                    checked={checked}
                    onChange={handleChecked}
                />
            </div>

            <div className={styles.tagForm}>
                <form onSubmit={handleAddTag}>
                    <input placeholder="add a tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                </form>
                {tags.map(tag => <Chip className={styles.chip} key={tag} label={tag} variant="outlined" onDelete={(e) => handleDeleteTag(e)} />)}
            </div>
            <button className={styles.subBtn} onClick={handleAddPost}>Add Post</button>
        </section>
    );

}

export default NewPost;