namespace $rootnamespace$
{
    partial class $safeitemrootname$ : Microsoft.Office.Tools.Outlook.ImportedFormRegionBase
    {
        $importedcontrolsdeclaration$
        public $safeitemrootname$(Microsoft.Office.Interop.Outlook.FormRegion formRegion)
            : base(Globals.Factory, formRegion)
        {
            this.FormRegionShowing += new System.EventHandler(this.$safeitemrootname$_FormRegionShowing);
            this.FormRegionClosed += new System.EventHandler(this.$safeitemrootname$_FormRegionClosed);
        }

        protected override void InitializeControls()
        {
            $importedcontrolsinitialization_v4$
        }

        public partial class $safeitemrootname$Factory : Microsoft.Office.Tools.Outlook.IFormRegionFactory
        {
            public event Microsoft.Office.Tools.Outlook.FormRegionInitializingEventHandler FormRegionInitializing;

            private Microsoft.Office.Tools.Outlook.FormRegionManifest _Manifest;

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            public $safeitemrootname$Factory()
            {
                this._Manifest = Globals.Factory.CreateFormRegionManifest();
                this.InitializeManifest();
                this.FormRegionInitializing += new Microsoft.Office.Tools.Outlook.FormRegionInitializingEventHandler(this.$safeitemrootname$Factory_FormRegionInitializing);
            }

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            public Microsoft.Office.Tools.Outlook.FormRegionManifest Manifest
            {
                get
                {
                    return this._Manifest;
                }
            }

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            Microsoft.Office.Tools.Outlook.IFormRegion Microsoft.Office.Tools.Outlook.IFormRegionFactory.CreateFormRegion(Microsoft.Office.Interop.Outlook.FormRegion formRegion)
            {
                $safeitemrootname$ form = new $safeitemrootname$(formRegion);
                form.Factory = this;
                return form;
            }

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            byte[] Microsoft.Office.Tools.Outlook.IFormRegionFactory.GetFormRegionStorage(object outlookItem, Microsoft.Office.Interop.Outlook.OlFormRegionMode formRegionMode, Microsoft.Office.Interop.Outlook.OlFormRegionSize formRegionSize)
            {
                System.Resources.ResourceManager resources = new System.Resources.ResourceManager(typeof($safeitemrootname$));
                return (byte[])resources.GetObject($ofsresourcename$);
            }

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            bool Microsoft.Office.Tools.Outlook.IFormRegionFactory.IsDisplayedForItem(object outlookItem, Microsoft.Office.Interop.Outlook.OlFormRegionMode formRegionMode, Microsoft.Office.Interop.Outlook.OlFormRegionSize formRegionSize)
            {
                if (this.FormRegionInitializing != null)
                {
                    Microsoft.Office.Tools.Outlook.FormRegionInitializingEventArgs cancelArgs = Globals.Factory.CreateFormRegionInitializingEventArgs(outlookItem, formRegionMode, formRegionSize, false);
                    this.FormRegionInitializing(this, cancelArgs);
                    return !cancelArgs.Cancel;
                }
                else
                {
                    return true;
                }
            }

            [System.Diagnostics.DebuggerNonUserCodeAttribute()]
            Microsoft.Office.Tools.Outlook.FormRegionKindConstants Microsoft.Office.Tools.Outlook.IFormRegionFactory.Kind
            {
                get
                {
                    return Microsoft.Office.Tools.Outlook.FormRegionKindConstants.Ofs;
                }
            }
        }
    }

    partial class WindowFormRegionCollection
    {
        internal $safeitemrootname$ $safeitemrootname$
        {
            get
            {
                foreach (var item in this)
                {
                    if (item.GetType() == typeof($safeitemrootname$))
                        return ($safeitemrootname$)item;
                }
                return null;
            }
        }
    }
}
