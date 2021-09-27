using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public sealed class GenerateSecurityKey
    {
        private static GenerateSecurityKey _instance = null;
        private static SymmetricSecurityKey _key = null;

        public static GenerateSecurityKey Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new GenerateSecurityKey();
                }
                return _instance;
            }
        }

        public SymmetricSecurityKey GetKey()
        {
            return _key;
        }

        private GenerateSecurityKey()
        {
            TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider();
            tripleDes.GenerateKey();
            _key = new SymmetricSecurityKey(Encoding.Unicode.GetBytes(tripleDes.Key.ToString()));
        }

    }
}