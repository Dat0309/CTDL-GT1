================================================================================
    MFC (MICROSOFT FOUNDATION CLASS) ライブラリ : [!output PROJECT_NAME] プロジェクトの概要
===============================================================================

この [!output PROJECT_NAME] アプリケーションは、アプリケーション ウィザードによって作成されました。このアプリケーションは MFC の基本的な使い方を示すだけでなく、アプリケーションを作成するための開始点でもあります。

このファイルには、[!output PROJECT_NAME] アプリケーションを構成する各ファイルの内容の概要が含まれています。

[!output PROJECT_NAME].vcxproj
    これは、アプリケーション ウィザードで生成された VC++ プロジェクトのメイン プロジェクト ファイルです。ファイルを生成した Visual C++ のバージョンに関する情報と、アプリケーション ウィザードで選択されたプラットフォーム、構成、およびプロジェクト機能に関する情報が含まれています。

[!output PROJECT_NAME].vcxproj.filters
    これは、アプリケーション ウィザードで生成された VC++ プロジェクトのフィルター ファイルです。このファイルには、プロジェクト内のファイルとフィルターとの間の関連付けに関する情報が含まれています。この関連付けは、特定のノードで同様の拡張子を持つファイルのグループ化を示すために IDE で使用されます (たとえば、".cpp" ファイルは "ソース ファイル" フィルターに関連付けられています)。

[!output APP_HEADER]
    これはアプリケーションのメイン ヘッダー ファイルです。
    その他のプロジェクト固有のヘッダー (Resource.h など) が含まれ、[!output APP_CLASS] アプリケーション クラスを宣言します。

[!output APP_IMPL]
    これはメインのアプリケーション ソース ファイルで、[!output APP_CLASS] アプリケーション クラスが含まれています。

[!output RC_FILE_NAME]
    これは、プログラムが使用するすべての Microsoft Windows リソースの一覧です。RES サブディレクトリに格納されるアイコン、ビットマップ、およびカーソルをインクルードしています。このファイルは、Microsoft Visual C++ で直接編集できます。プロジェクト リソースは [!output LCID] にあります。

res\[!output PROJECT_NAME].ico
    これはアプリケーションのアイコンとして使用されるアイコン ファイルです。このアイコンは、メイン リソース ファイル [!output PROJECT_NAME].rc にインクルードされます。

res\[!output RC2_FILE_NAME].rc2
    このファイルには、Microsoft Visual C++ で編集しないリソースが含まれています。リソース エディターで編集できないすべてのリソースは、このファイルに含める必要があります。
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    これは、フレームワークが自動的に行う登録設定の例を記述したサンプル .reg ファイルです。これを .reg ファイルとして使用し、
[!if APP_TYPE_DLG]
    アプリケーションに添付できます。
[!else]
    アプリケーションに添付することも、削除して既定の登録 RegisterShellFileTypes に依存することもできます。
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    このファイルには、アプリケーションのタイプ ライブラリ用のインターフェイス記述言語ソース コードが含まれています。
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

メイン フレーム ウィンドウ:
[!if PROJECT_STYLE_EXPLORER]
    Windows エクスプローラー形式: プロジェクトには、2 つのフレームを備えた Windows エクスプローラーのようなインターフェイスが含まれます。
[!else]
    プロジェクトには標準の MFC インターフェイスが含まれます。
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    これらのファイルには、フレーム クラス [!output MAIN_FRAME_CLASS] が含まれます。このクラスは
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd から派生し、すべての MDI フレーム機能を制御します。
[!else]
    CMDITabbedFrameWnd から派生し、すべての MDI フレーム機能を制御します。
[!endif]
[!else]
    CFrameWnd から派生し、すべての SDI フレーム機能を制御します。
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    これらのファイルには、CTreeView から派生した左フレーム クラス [!output TREE_VIEW_CLASS] が含まれます。
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    このビットマップ ファイルは、ツール バーのイメージを作成するために使用されます。
    初期ツール バーと初期ステータス バーは、[!output MAIN_FRAME_CLASS] クラスで生成されます。ツール バーのボタンを追加するには、リソース エディターを使用してこのツール バーのビットマップを編集し、[!output PROJECT_NAME].rc 内の IDR_MAINFRAME TOOLBAR 配列を更新します。
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    このビットマップ ファイルは、別のコンテナー内でサーバー アプリケーションの埋め込み先編集が有効化されたときの、ツール バーのイメージを作成するために使用されます。このツール バーは、[!output INPLACE_FRAME_CLASS] クラスで生成されます。このビットマップは、サーバーに不要な多くのコマンドが含まれていない点を除き、res\Toolbar.bmp のビットマップと似ています。

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

子フレーム ウィンドウ:

ChildFrm.h, ChildFrm.cpp
    これらのファイルは、MDI アプリケーションの子ウィンドウをサポートする [!output CHILD_FRAME_CLASS] クラスを定義して実装します。

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
アプリケーション ウィザードは 1 つのドキュメントの種類と 1 つのビューを作成します。

[!output DOC_HEADER], [!output DOC_IMPL] - ドキュメント
    これらのファイルには、[!output DOC_CLASS] クラスが含まれます。これらのファイルを編集して、特殊なドキュメント データを追加し、ファイルの保存と読み込みを実装することができます ([!output DOC_CLASS]::Serialize を使用)。
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    ドキュメントには次の文字列が含まれます。
        ファイル拡張子:      [!output FILE_EXTENSION]
        ファイルの種類の ID:        [!output FILE_TYPE_ID]
        メイン フレームのキャプション:  [!output MAIN_FRAME_CAPTION]
        ドキュメントの種類の名前:       [!output DOC_TYPE_NAME]
        フィルター名:         [!output FILTER_NAME]
        ファイルの新しい短い名前: [!output FILE_NEW_NAME_SHORT]
        ファイルの種類の長い名前: [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
アプリケーション ウィザードは 1 つのビューを作成します。
[!endif]

[!output VIEW_HEADER], [!output VIEW_IMPL] - ドキュメントのビュー
    これらのファイルには、[!output VIEW_CLASS] クラスが含まれます。
[!if !DB_VIEW_NO_FILE]
    [!output VIEW_CLASS] オブジェクトは [!output DOC_CLASS] オブジェクトを表示するために使用されます。
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    これは、[!output DOC_CLASS] クラスの MDI 子ウィンドウのアイコンとして使用されるアイコン ファイルです。このアイコンは、メイン リソース ファイル [!output PROJECT_NAME].rc にインクルードされます。
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

データベース サポート:

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    これらのファイルには、[!output ROWSET_CLASS] クラスが含まれます。このクラスは、ウィザードで選択したデータ ソースにアクセスするために使用されます。
[!if DB_VIEW_NO_FILE]
    シリアル化のサポートは追加されません。
[!else]
    シリアル化のサポートが追加されました。
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

アプリケーション ウィザードが OLE に固有のクラスも作成しました

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    これらのファイルには、[!output CONTAINER_ITEM_CLASS] クラスが含まれます。このクラスは、OLE オブジェクトを操作するために使用されます。OLE オブジェクトは通常、[!output VIEW_CLASS] クラスによって表示され、[!output DOC_CLASS] クラスの一部としてシリアル化されます。
[!if ACTIVE_DOC_CONTAINER]
    フレーム内にアクティブ ドキュメントを保持するためのサポートがプログラムに含まれます。
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    これらのファイルには、[!output SERVER_ITEM_CLASS] が含まれています。このクラスは、[!output DOC_CLASS] クラスを OLE システムに接続し、必要に応じてドキュメントへのリンクを設定するために使用されます。
[!if ACTIVE_DOC_SERVER]
    プロジェクトはアクティブ ドキュメントの作成および管理をサポートします。
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    これらのファイルには、[!output INPLACE_FRAME_CLASS] が含まれています。このクラスは、COleIPFrameWnd から派生し、埋めこみ先編集が有効化されている間のすべてのフレーム機能を制御します。
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    プロジェクトは複合ファイルをサポートします。複合ファイル形式では、1 つ以上のオートメーション オブジェクトが含まれるドキュメントが 1 つのファイルに保存されます。オブジェクトには個別にアクセスできます。
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
アプリケーション ウィザードは 1 つのダイアログ クラスおよびオートメーション プロキシ クラスを作成します。
[!else]
アプリケーション ウィザードは 1 つのダイアログ クラスを作成します。
[!endif]

[!output DIALOG_HEADER], [!output DIALOG_IMPL] - ダイアログ
    これらのファイルには、[!output DIALOG_CLASS] クラスが含まれます。このクラスはアプリケーションのメイン ダイアログの動作を定義します。ダイアログのテンプレートは、Microsoft Visual C++ で編集できる [!output PROJECT_NAME].rc に含まれています。
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER], [!output DIALOG_AUTO_PROXY_IMPL] - オートメーション オブジェクト
    これらのファイルには、[!output DIALOG_AUTO_PROXY_CLASS] クラスが含まれます。このクラスは、オートメーション コントローラーがダイアログにアクセスするために使用できるオートメーション メソッドおよびプロパティの公開を処理することから、ダイアログのオートメーション プロキシ クラスと呼ばれます。これらのメソッドおよびプロパティはダイアログ クラスから直接公開されません。これは、モーダル ダイアログ ベースの MFC アプリケーションの場合、オートメーション オブジェクトとユーザー インターフェイスを別々にしておく方が簡単であるためです。
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

その他の機能:
[!if ACTIVEX_CONTROLS]

ActiveX コントロール
    ActiveX コントロールを使用するためのサポートがアプリケーションに含まれます。
[!endif]
[!if PRINTING]

印刷と印刷プレビューのサポート
    MFC ライブラリから CView クラス内のメンバー関数を呼び出すことによって、アプリケーション ウィザードで、印刷、印刷設定、および印刷プレビューのコマンドを処理するコードが生成されました。
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

データベース サポート
    アプリケーション ウィザードにプログラムのための基本的なレベルのデータベース サポートが追加されました。必要なファイルのみが含まれています。
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

分割ウィンドウ
    アプリケーション ウィザードにアプリケーション ドキュメント用の分割ウィンドウのサポートが追加されました。
[!endif]
[!if MAPI]

MAPI サポート
    生成されたプロジェクトにはメール メッセージを作成、操作、転送、および保存するために必要なコードが含まれています。
[!endif]
[!if SOCKETS]

Windows ソケット
    アプリケーションは TCP/IP ネットワークを介した通信の確立をサポートします。
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

その他の標準ファイル :

StdAfx.h, StdAfx.cpp
    これらのファイルは、[!output PROJECT_NAME].pch という名前のプリコンパイル済みヘッダー (PCH) ファイルと、StdAfx.obj という名前のプリコンパイル済みの型ファイルをビルドするために使用されます。

Resource.h
    これは、新しいリソース ID を定義する標準のヘッダー ファイルです。このファイルの読み込みおよび更新は、Microsoft Visual C++ で行います。

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	アプリケーション マニフェスト ファイルは、Windows XP で、特定のバージョンの side-by-side アセンブリに対するアプリケーションの依存関係を説明するために使用されます。ローダーはこの情報を使用して、アセンブリ キャッシュから適切なアセンブリを、またはアプリケーションからプライベート アセンブリを読み込みます。アプリケーション マニフェストは、再頒布用に、アプリケーションの実行可能ファイルと同じフォルダーにインストールされる外部 .manifest ファイルとして含まれているか、またはリソースのフォーム内の実行可能ファイルに含まれています。
[!endif]
/////////////////////////////////////////////////////////////////////////////

その他のメモ :

アプリケーション ウィザードでは "TODO:" を使用して、ユーザーが追加またはカスタマイズする必要のあるソース コードを示します。
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

アプリケーションが共有 DLL 内で MFC を使用する場合は、MFC DLL を再頒布する必要があります。アプリケーションがオペレーティング システムのロケール以外の言語を使用している場合、対応するローカライズされたリソース mfc110XXX.DLL も再頒布する必要があります
これらのトピックの詳細については、MSDN ドキュメントの Visual C++ アプリケーションの再頒布に関するセクションを参照してください。
[!endif]

/////////////////////////////////////////////////////////////////////////////
