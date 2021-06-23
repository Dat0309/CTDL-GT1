using System;
using System.Reflection;

[assembly: AssemblyTitle("Dotfuscator Sample Application")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("PreEmptive Solutions, LLC")]
[assembly: AssemblyCopyright("Copyright 2002-2012, All Rights Reserved")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]         


[assembly: AssemblyVersion("1.0.*")]
[assembly: AssemblyProduct("Dotfuscator Sample Application")]

namespace HelloWorld {
	public class Hello {


		public static void Main( string[] args ) {

			Converse( "Alice", "Bob" );

            Console.WriteLine("Press SPACE to cause an exception, or any other key to exit...");
            if (Console.ReadKey().Key == ConsoleKey.Spacebar)
            {
                throw new Exception();
            }
		}

        public static bool OptIn()
        {
            return true;
        }

		private static void Converse( string name1, string name2 ) {

			Friendly friend1 = new Friendly( name1 );
			Friendly friend2 = new Friendly( name2 );

			friend1.SayHello();
			friend2.SayHello();

			friend1.SayGoodbye( friend2.Name );
			friend2.SayGoodbye( friend1.Name );

		}
	}

	class Friendly {

		private string myName;

		public Friendly( string name ) {
			myName = name;
		}

		public void SayHello() {
			Console.WriteLine( "Hello, my name is {0}", myName );
		}

		public void SayGoodbye( string othername) {
			Console.WriteLine( "Goodbye {0}", othername );
		}

		public string Name {
			get {
				return myName;
			}
			set {
				value = myName;
			}
		}

	}
}
