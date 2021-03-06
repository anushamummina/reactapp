var Bookmarks = createReactClass({
	getInitialState: function(){
		return {
			bookmarks: this.props.bookmarks,
			categories: this.props.categories,
			title: 'Title',
			host: 'Host',
			url: 'URL',
			category_id: 1,
			search: ''
		}
	},

	handleUserInput:function(obj){
		this.setState(obj);
	},	
	
	handleFormSubmit: function(){
		var bookmark = {title: this.state.title, host: this.state.host, url: this.state.url, category_id: this.state.category_id};
		$.post("/bookmarks",
				{bookmark: bookmark})
			   .done(function(data){
			   	 this.addNewBookmark(data);
			   }.bind(this));
	},

	handleSearchSubmit: function(){
		$.get("/bookmarks",
				{q: this.state.search})
			   .done(function(data){
			   	 this.replaceSearchResultsBookmark(data);
			   }.bind(this));
	},

	replaceSearchResultsBookmark: function(bookmarks){
		this.setState({ bookmarks: bookmarks});
	},

	handleClear: function(){
		window.location.reload();
	},

	addNewBookmark: function(bookmark){
		this.setState({ bookmarks: this.state.bookmarks.concat(bookmark)});
	},

	handleUpdate(bookmark){
		var new_bookmark = {title: bookmark.title, host: bookmark.host, url: bookmark.url, category_id: bookmark.category};
	    fetch("/bookmarks/"+bookmark.id, 
	    {
	      method: 'PUT',
	      body: JSON.stringify({bookmark: new_bookmark}),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }).then((response) => { 
	        this.updateBookmark(bookmark)
	      })
	},  
	
	updateBookmark(bookmark){
	    let newBookmarks = this.state.bookmarks.filter((b) => b.id !== bookmark.id)
	    newBookmarks.push(bookmark)
	    this.setState({
	      bookmarks: newBookmarks
	    })
	},
	handleDelete: function(id){
		fetch("/bookmarks/"+id,{method: 'DELETE', id: id, headers: {'Content-Type':'application/json'}
			}).then((response) => {
			   	 this.deleteBookmark(id);
			   }.bind(this));
	},
	deleteBookmark: function(id){
		new_bookmarks = this.state.bookmarks.filter((bookmark) => bookmark.id !== id)
		this.setState({ bookmarks: new_bookmarks});
	},
	render: function() {
		return (
			<div>
				<BookmarkForm input_url={this.state.url} 
					input_host={this.state.host} 
					input_title={this.state.title}
					input_category_id={this.state.category_id}
					categories={this.state.categories}
					onUserInput={this.handleUserInput}
					onFormSubmit={this.handleFormSubmit}/>
				<BookmarkSearch input_search={this.state.search}
					onUserInput={this.handleUserInput}
					onSearchFormSubmit={this.handleSearchSubmit}
					handleClear={this.handleClear} />
				<BookmarksList bookmarks={this.state.bookmarks} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>
			</div>
		)
	}
});
