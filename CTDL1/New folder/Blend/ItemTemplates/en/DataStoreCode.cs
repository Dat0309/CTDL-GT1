// Template rules
//   1. Snippets are marked with "//<snippet>" tokens. First marker occurrence determines snippet beginning.
//      Second marker occurrence determines end. It is recommended (but not required) to add BEGIN and
//      END suffixes for better readability, e.g. "//<snippet> - BEGIN", "//<snippet> - END".
//      Second marker can be omitted in case of single line snippet (e.g. see ClrNamespaceFooter marker).
//
//   2. Snippet markers should be located on a separate line above (beyond) snippet or at the end of the first 
//      (last) snippet line. Text from the marker to the end of the line will be removed.
//
//   3. FOLLOWING CASE SENSITIVE WORDS ARE RESERVED. They will be replaced with data store data names (type names,
//      property names, etc) during sample data code generation.
//          CLR_NAMESPACE
//          GLOBALSTORAGE_TYPE
//          DATASTORE_TYPE
//          PROPERTY_NAME
//          PROPERTY_TYPE
//          PROPERTY_VALUE
//          PROJECT_ASSEMBLY_NAME
//          DATA_STORE_ROOT_FOLDER
//          DATA_STORE_NAME
//
//   4. Case sensitive snippet markers are
//          ClrNamespaceHeader
//          ClrNamespaceFooter
//          GlobalStorageTypeHeader
//          GlobalStorageTypeFooter
//          GlobalStorageGetSetProperty
//          DataStoreTypeHeader
//          DataStoreTypeFooter
//          DataStoreTypeConstructor
//          DataStoreGetSetProperty
///////////////////////////////////////////////////
namespace CLR_NAMESPACE //ClrNamespaceHeader - BEGIN
{
	using System;
	using System.Collections.Generic; //ClrNamespaceHeader - END
	
	public class GLOBALSTORAGE_TYPE //GlobalStorageTypeHeader - BEGIN
	{
		public static GLOBALSTORAGE_TYPE Singleton;
		public bool Loading {get;set;}
		private List<WeakReference> registrar; 

		public GLOBALSTORAGE_TYPE()
		{
			this.registrar = new List<WeakReference>();
		}
		
		static GLOBALSTORAGE_TYPE()
		{
			Singleton = new GLOBALSTORAGE_TYPE();
		}

		public void Register(DATASTORE_TYPE dataStore)
		{
			this.registrar.Add(new WeakReference(dataStore));
		}

		public void OnPropertyChanged(string property)
		{
			foreach (WeakReference entry in this.registrar)
			{
				if (!entry.IsAlive)
				{
					continue;
				}
				DATASTORE_TYPE dataStore = (DATASTORE_TYPE)entry.Target;
				dataStore.FirePropertyChanged(property);
			}
		}
		
		public bool AssignementAllowed
		{
			get
			{
				// Only assign from loading once
				if(this.Loading && this.registrar.Count > 0)
				{
					return false;
				}
				
				return true;
			}
		}

		//GlobalStorageTypeHeader - END

		//Properties listed below 
		private PROPERTY_TYPE _PROPERTY_NAME = PROPERTY_VALUE;  //GlobalStorageGetSetProperty - BEGIN

		public PROPERTY_TYPE PROPERTY_NAME
		{
			get
			{
				return this._PROPERTY_NAME;
			}

			set
			{
				if(!this.AssignementAllowed)
				{
					return;
				}
				
				if (this._PROPERTY_NAME != value)
				{
					this._PROPERTY_NAME = value;
					this.OnPropertyChanged("PROPERTY_NAME");
				}
			}
		}  //GlobalStorageGetSetProperty - END
		
	} //GlobalStorageTypeFooter

	public class DATASTORE_TYPE : System.ComponentModel.INotifyPropertyChanged //DataStoreTypeHeader - BEGIN
	{
		public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
		
		public void FirePropertyChanged(string propertyName)
		{
			this.OnPropertyChanged(propertyName);
		}

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (this.PropertyChanged != null)
			{
				this.PropertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
			}
		} //DataStoreTypeHeader - END

		public DATASTORE_TYPE() //DataStoreTypeConstructor - BEGIN
		{
			try
			{
				System.Uri resourceUri = new System.Uri("/PROJECT_ASSEMBLY_NAME;component/DATA_STORE_ROOT_FOLDER/DATA_STORE_NAME/DATA_STORE_NAME.xaml", System.UriKind.Relative);
				if (System.Windows.Application.GetResourceStream(resourceUri) != null)
				{
					GLOBALSTORAGE_TYPE.Singleton.Loading = true;
					System.Windows.Application.LoadComponent(this, resourceUri);
					GLOBALSTORAGE_TYPE.Singleton.Loading = false;
					GLOBALSTORAGE_TYPE.Singleton.Register(this);
				}
			}
			catch (System.Exception)
			{
			}
		} //DataStoreTypeConstructor - END

		private PROPERTY_TYPE _PROPERTY_NAME = PROPERTY_VALUE;  //DataStoreGetSetProperty - BEGIN

		public PROPERTY_TYPE PROPERTY_NAME
		{
			get
			{
				return GLOBALSTORAGE_TYPE.Singleton.PROPERTY_NAME;
			}

			set
			{
				GLOBALSTORAGE_TYPE.Singleton.PROPERTY_NAME = value;
			}
		}  //DataStoreGetSetProperty - END

	} //DataStoreTypeFooter
} //ClrNamespaceFooter
