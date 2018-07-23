var Bookmark = createReactClass({
	getInitialState: function(){
		return {
			editable: false,
			title: '',
			host: '',
			url: '',
			category: '',
		}
	},

	handleEdit(){
		if(this.state.editable){
	      let title = this.state.title.value
	      let host = this.state.host.value
	      let url = this.state.url.value
	      let category = this.state.category.value
	      let id = this.props.bookmark.id
	      let bookmark = {id: id, title: title, host:  host, url: url, category: category}
	      this.props.handleUpdate(bookmark)
	    }
		this.setState({
			editable: !this.state.editable
		})
	},

	render: function(){
		let title = this.state.editable? <input type='text' ref={input => this.state.title = input} defaultValue={this.props.bookmark.title}/>:<p>{this.props.bookmark.title}</p>
		let host = this.state.editable? <input type='text' ref={input => this.state.host = input} defaultValue={this.props.bookmark.host}/>:<p>{this.props.bookmark.host}</p>
		let url = this.state.editable? <input type='text' ref={input => this.state.url = input} defaultValue={this.props.bookmark.url}/>:<p>{this.props.bookmark.url}</p>
		let category = this.state.editable? <input type='text' ref={input => this.state.category = input} defaultValue={this.props.bookmark.category}/>:<p>{this.props.bookmark.category}</p>
		return ( 
			<tr>
		        <td>{title}</td>
		        <td>{host}</td>
		        <td>{url}</td>
		        <td>{category}</td>
		        <td>
		        <button onClick={() => this.handleEdit()} className="edit_button">{this.state.editable? 'Submit' : 'Edit'}</button>&nbsp;&nbsp;
		        <button onClick={() => this.props.handleDelete(this.props.bookmark.id)} className="delete_button">Delete</button></td>
	      	</tr>		
		)
	}
})
