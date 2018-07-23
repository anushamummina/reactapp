var BookmarksList = createReactClass({
	render: function(){
		return(
			<div>
				<h2>Bookmarks</h2>
				<table>
					<thead>
					    <tr>
					      <th>Title</th>
					      <th>Host</th>
					      <th>Url</th>
					      <th>Category</th>
					      <th></th>
					    </tr>
					</thead>

					<tbody>
						{this.props.bookmarks.map((bookmark) =>
				    		<Bookmark bookmark={bookmark} key = {bookmark.id} 
				    		 handleUpdate={this.props.handleUpdate}
				    		handleDelete={this.props.handleDelete}/>
						)}
					</tbody>
				</table>
			</div>
		)
	}
})