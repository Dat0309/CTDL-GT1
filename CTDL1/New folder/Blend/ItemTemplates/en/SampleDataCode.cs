// Template rules
//   1. Snippets are marked with "//<snippet>" tokens. First marker occurrence determines snippet beginning.
//      Second marker occurrence determines end. It is recommended (but not required) to add BEGIN and
//      END suffixes for better readability, e.g. "//<snippet> - BEGIN", "//<snippet> - END".
//      Second marker can be omitted in case of single line snippet (e.g. see ClrNamespaceFooter marker).
//
//   2. Snippet markers should be located on a separate line above (beyond) snippet or at the end of the first 
//      (last) snippet line. Text from the marker to the end of the line will be removed.
//
//   3. FOLLOWING CASE SENSITIVE WORDS ARE RESERVED. They will be replaced with sample data names (type names,
//      property names, etc) during sample data code generation.
//          CLR_NAMESPACE
//          APPLICATION_NAMESPACE
//          SAMPLE_DATA_URI
//          COMPOSITE_TYPE
//          PROPERTY_NAME
//          PROPERTY_TYPE
//          PROPERTY_VALUE
//          COLLECTION_TYPE
//          ITEM_TYPE
//
//   4. Case sensitive snippet markers are
//          ClrNamespaceHeader
//          ClrNamespaceFooter
//          CompositeTypeHeader
//          CompositeTypeFooter
//          RootTypeConstructor
//          GetSetProperty
//          GetProperty
//          CollectionType
///////////////////////////////////////////////////
namespace CLR_NAMESPACE //ClrNamespaceHeader - BEGIN
{
	using System; 
	using System.ComponentModel;

// To significantly reduce the sample data footprint in your production application, you can set
// the DISABLE_SAMPLE_DATA conditional compilation constant and disable sample data at runtime.
#if DISABLE_SAMPLE_DATA
	internal class COMPOSITE_TYPE { }
#else  //ClrNamespaceHeader - END

	public class COMPOSITE_TYPE : INotifyPropertyChanged //CompositeTypeHeader - BEGIN
	{
		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (this.PropertyChanged != null)
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		} //CompositeTypeHeader - END

		public COMPOSITE_TYPE() //RootTypeConstructor - BEGIN
		{
			try
			{
				Uri resourceUri = new Uri("SAMPLE_DATA_URI", UriKind.RelativeOrAbsolute);
				APPLICATION_NAMESPACE.Application.LoadComponent(this, resourceUri);
			}
			catch
			{
			}
		} //RootTypeConstructor - END

		private PROPERTY_TYPE _PROPERTY_NAME = PROPERTY_VALUE;  //GetSetProperty - BEGIN

		public PROPERTY_TYPE PROPERTY_NAME
		{
			get
			{
				return this._PROPERTY_NAME;
			}

			set
			{
				if (this._PROPERTY_NAME != value)
				{
					this._PROPERTY_NAME = value;
					this.OnPropertyChanged("PROPERTY_NAME");
				}
			}
		}  //GetSetProperty - END

		private PROPERTY_TYPE _PROPERTY_NAME = PROPERTY_VALUE; //GetProperty - BEGIN

		public PROPERTY_TYPE PROPERTY_NAME
		{
			get
			{
				return this._PROPERTY_NAME;
			}
		} //GetProperty - END
	} //CompositeTypeFooter

	//CollectionType - BEGIN
	public class COLLECTION_TYPE : System.Collections.ObjectModel.ObservableCollection<ITEM_TYPE>
	{ 
	}
	//CollectionType - END
//ClrNamespaceFooter - BEGIN
#endif
}
//ClrNamespaceFooter - END