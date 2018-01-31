(function() {

	CKEDITOR.plugins.add( 'fontsize', {
		icons: 'fontincrease,fontdecrease',
		hidpi: true,
		init: function( editor ) {
			var config = editor.config;

			addCommand(editor, 'increaseFontSize', increaseFontSize);
			addCommand(editor, 'decreaseFontSize', decreaseFontSize);
			
			addButton( editor, 'FontIncrease', 'Increase font size' , 'increaseFontSize');
			addButton( editor, 'FontDecrease', 'Decrease font size' , 'decreaseFontSize');
		}
	} );
	
	function addButton( editor, name, title, command ) 
	{
		editor.ui.addButton(name, 
		{ 
			label: title,
			command: command,
			toolbar: 'styles'
		});
	}
	
	function addCommand(editor, name, func)
	{
		editor.addCommand(name, {
			exec : function(editor) {				
				func(editor);
			}
		});
	}
	
	function increaseFontSize(editor)
	{
		changeFontSize(editor, 1);
	}
	
	function decreaseFontSize(editor)
	{
		changeFontSize(editor, -1);
	}
	
	function changeFontSize(editor, plus)
	{			
		var span = editor.elementPath().contains( function( element ) {        
			return element.is( 'span' ) && element.getStyle( 'font-size' );
		}); 
		
		var fontSize = span ? span.getStyle( 'font-size' ) : "";

		if(!fontSize) { fontSize = editor.config.fontSize_default; }
		
		var value = parseInt(fontSize, 10) + plus;
		
		if(value <= 0 ) { value = 1; }
		
		var style = new CKEDITOR.style({
			element: 'span',
			attributes: {
				'style': 'font-size:' + value + 'px'
			}
		});
		
		editor.applyStyle(style);
	}
	
	
} )();

CKEDITOR.config.fontSize_default = "15px";