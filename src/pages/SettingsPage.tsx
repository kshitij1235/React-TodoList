import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavigationBar from '../components/Navigation';
import PriorityModel from '../Interfaces/Priority';

const SettingsPage = () => {
    const [tags, setTags] = useState<PriorityModel[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [colorInput, setColorInput] = useState('#000000');

    useEffect(() => {
        axios
            .get<PriorityModel[]>('http://localhost:3001/api/priority')
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const addTag = () => {
        if (tagInput) {
            const newTag = { priority: tagInput, color: colorInput };
            axios
                .post('http://localhost:3001/api/priority', newTag)
                .then((response) => {
                    setTags([...tags, response.data]);
                    setTagInput('');
                    setColorInput('#000000');
                })
                .catch((error) => {
                    console.error('There was an error adding the tag!', error);
                });
        }
    };

    const deleteTag = (id: number) => {
        console.log("lamo");
        axios
            .delete(`http://localhost:3001/api/delete/priority/${id}`)
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the data!', error);
            });
    };

    return (
        <Fragment>
            <NavigationBar />
            <div className="container mt-5">
                <h2>Settings</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Add Tag Section */}
                    <div className="card mb-4">
                        <div className="card-header">Add a Tag</div>
                        <div className="card-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tagInput"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Enter a tag"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="colorInput">Color</label>
                                <input
                                    type="color"
                                    className="form-control"
                                    id="colorInput"
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                />
                            </div>
                            <div className="py-3">
                                <button type="button" className="btn btn-primary" onClick={addTag}>
                                    Add Tag
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="card mb-4">
                        <div className="card-header">Tags</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {tags.map((tag, index) => (
                                    
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        style={{ backgroundColor: tag.color, color: '#fff' }}
                                    >
                                        {tag.priority}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteTag(tag.p_id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default SettingsPage;
