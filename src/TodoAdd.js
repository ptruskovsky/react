import { Component } from "react";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);
        this.clearFormData();
    }

    clearFormData() {
        this.formData = {
            title: "",
            desc: "",
            image: ""
        };
    }

    handleTitleChange(evt) {
        this.formData.title = evt.target.value;
    }

    handleDescChange(evt) {
        this.formData.desc = evt.target.value;
    }

    handleImageChange(evt) {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }
            fileReader.readAsDataURL(cFiles[0]);                
        } else {
            this.formData.image = '';
        }
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        const newDeed = {... this.formData };
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleDateString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
        this.clearFormData();
        evt.target.reset();
    }

    render() {
        return (
            <section>
                <h1>Создание нового дела</h1>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input className="input" onChange={this.handleTitleChange.bind(this)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <textarea className="textarea" onChange={this.handleDescChange.bind(this)} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input className="file-input"
                                    type="file" accept="image/*"
                                    onChange={this.handleImageChange.bind(this)}
                                />
                                <span className="file-cta">
                                    <span className="file-lable">
                                        Иллюстрация
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс"/>
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary" value="Создать дело" />
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}