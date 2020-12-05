"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var main_1 = require("../main");
var node_jose_1 = require("node-jose");
var signers_1 = require("../main/signers");
var did_resolver_1 = require("did-resolver");
var node_did_jwk_1 = require("node-did-jwk");
var util_1 = __importDefault(require("util"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var node_forge_1 = require("node-forge");
var DID = "did:jwk:ZUp3bGprMFRRa0FBUVAvTG5qT2pRdWxXYklPeWtSajIwb2dkSDV2S1JxVHB2N2VtMjN1SE4vTStnRFp2c0FKUUF4TkFpNVRqMW5tZUJuTW9MbkZvek5YYTdoNkNhVW1RVmdMRFNacFZibzdrdzY1OXZvakptL2lhamJrM2t4VnVDWHR4YzRTLzlad1hscTl2WWxoak5ZZ3o1VHduV05aOUtkb1BmVXVPVkd5Tk12QWhXZTZWeE9YRnVIS0VVVC9OdmJkMnZ6WGx1dWd5VWNJV1EyR0ZYTjBtMmpVOHNTSHhVRmRTRzN4LzNydzdoQT09";
var DID_2 = "did:jwk:ZUp3bGpqa09na0FBQVAreXRTYUxCQVE3UU9TV0c2UXlpM0pEUU1LcDhlOHVzWnNwSnBrUHFJWVZuSUFvZ0Iyb2lpZkdaT1pxd2VMZlM4aXJxTFpSNHF3Qm83WUZVa0tPdFNHalVKN2JpMU9VaGhBM3FNNjIzRDFRTkxaSFAyR3o5bjliTUU5a1E1dmRFVjVzNld3aFZuRnlyelNDa1kxVldkR2Q1bFpXTDFMS2ZMclRXMXhzSzI4NWlLU1U2UW5OV3VKNXpnS3p5TzlYUXZNU1F4K1lzVVU2bjBtUTlEc2VndThQaUxvNkhnPT0";
var DID_3 = "did:jwk:ZUp6VmxFZXY2OGdSaGYvTDNkTFhZaFk1d0N5YU9TZFJUSVloTUlsSnBKaVQ0Zjl1dmZlQWdUMGJiKzFkOTRjcWROZXBnL09QcjJZK3ZuNzdjbTdnNnk5ZlRaVjl6dmtldC8wci8rdDdMRDVzSitZUFN4QlNoRFBEczFLTFZBWkJ5c0N5c1A1WmhRLzdVOU45S3BCNHRtL1NDc1NINGZuZkdjT1BMNEd6R3puRGczUEFXL0Nvd0RkMWxnSi92ZVZZUmdHMVkvR2kwNlVIcGlxQllpUWpXemRuZmMzNmEwZWY1aEowWlVBKzR5Ulp4cmZ3TFV6RVJyWEhhY096NEJuYndoREpVYTVYSWNWOXVWNnRNMXU4dC9EQVJqSVBMUGt0dTdFUDFKeExLWnlZbnFxbUNhK0pIYWR4TXZ6c1VUOVRvSWFxMUNvNEo2Q2JHV09LRzdyZnVMRU9aSFNtL1BlUlJ4WmlUbzNtTjQ0cHFDVmdZdmYwUmQ1a3FHYWN2ZlVCaTZKT0kzZ2F2MUNkRFZWT0YyV04zTjlTZkhPeDUwQmF1VFBNVEg4M2sydVppNCtFYWxrdnlyejJlb2M1Mkgxb0NvclZwUG5ZTEhsSDhPL3daaTZXeUlnYWs2YXU4Y2I0N3lWb2hneG5hbE4rYU50SDNQd2pMckFCODNNWDZkZHZmL3ZTWlpsVE9KWUZ4Y1lDbTk4NE8xVFVkeVNYYTJwODdocGpnODNuZUUwSGpRaVFPOCtVT212RC9NNXp3R1FLdzJOQW9UTXd2V1NpY01RK3RYTW5NSDd4VkdjYUd2NXdMSFI1V3dmNHozNjIyS1FvS01za1lLYkk1ZTg2SS8va1lOdTBQL2lOV05NMjNhUXlOZlFhN0xyTDd6ckh3NFlyWS81UHh2OG5xNWxRdDZlTnRVUE9zMjJSM3hUTy92YzN3U2E1S0FHSGdkSW5KMi9wQVA0MXk3YUpMdVo4ZUZicUR0aTQ0bWUveW9Ic2xZdkNuSXI3UzNmc2pmL0ZPUTdNZjNDdHBZL28vT2gyay8rc0dmUFJqQ3NLM2dJL2RMWGY3T2ZNQU1NZjczeDUzWmoxOUx5MXN4MlZjR3hZWWFWY29NaEZLU3k4c0ZZZGR4d1Q3bWJzQ2RoK1cyVGxaQzcwVVhtSDY1UGJtOUJ4Q0l0ejRwS2U0NHZBUGFoRFcvUTZrTXl6VE16VVVxWUpOalRIYzFPdHlIM3FuVUI3WUFxVmZEMHBMSG5GekpNbW9lNTFIaXJMbzYrQzdRck1NczFFT3Fwamp4SXdYTlVyNTNWUEhNTUEyN0lsVWVWZ3p5YXVuWTg3eWw4V0xpR1hOc1VZYStwYWwzWkhoVVY2M2kxdmJ4djREWVdVSlZjOEZmWHFKUmVhS1dzcnl5V3h6MnJRc3NYSlZDdzB4UXphTkRSR0xqWFd4S01kZTF3TDRVRzVvaGVsZVBtQkZ5MklBV2orY2h6WmpFUDFTbkdIbnVWV3k5ZGp2UmRPdFFVU2Y4YkdibjFHVjdzY2hHZGxIZFJudFR3QTdnL1BOVVBaVkNLOXdReXdKd0VBODRlZkFhTVJycGhkaG5sV0svOCs0bk9jbTFrekVzTmxDRlZvdnhTN1RaOE5rcWVDRStvYXp4TlZ3QmI5ZWJsSFRrd3pYWms0YU55dlhFaUhrdk91Rk82cG8zciticU5yVXU2M3JZN09DWXFhRm5tdW80T3VBRWlIN3R5TkRJc0xJYTdXVUp1OVRORXRpemVlakxUUXVkeG5YVSt1aG9GV1lUbXlXeWkrNHR0RW5BWXpXeDMzcEFjcnd1djh3Z1d0WFJ5UWF3YXk1eklpV3BQOE5iakxZT2dSeFk3bGRuMmhiMU9tTzhpUERsSW1PM1ZXNExBTkxhL1g3MVl5MDBTbXAvS3FpMXBQMkM3WmlFMncyUlZhNHlwTG9UZWJMUzI2UEcrZDZzZmVGUXVLbXBsNWlOSXBoS3g1Y001ams2b0xCNzBCdG1rV01ZYUNWVkdWTERCeUgrbGRqd2YxWmJKLy8vMlRJRCtpdzZnL0ZpOXhsb2ZaTEhvbWhMUFRKVkZlWHRlQjFwYWh1ZlRTOXI4Y0thZkJ5Y1NmSXVVWCszK0lGRE41UTUyS01uUTAzb1V1Q01OTXNXRzczMjlKRFZ2ZGs5d2xqRzVIUEVnWkx4ZGdkNjRJRnlNNC9hajhONFlJZk5HNEVQWTJEb25Ia2JUSjk2RGxxQ0xMY2FydnZJWWx2REplMVlyTU54MGNabnFXWThuem9leWE1cFVQMENIeXBJa284cmdZakZSdHNEUzhEVVZ3WEFQZUlsUmRkNTlNRnhNbjZwNmR0SnhobUxaUm9zTTN4b1lrQXBiRHdMaTg3S3NiRHdoeGRzanFDWHlxa2V2OUtiNGpURExrRjVxVzhTZzNGK1lGamNJQlJkMUs4TlFkdWdsVzR2RHAyMTJXTkc0Mk92Qk1wTGJjVk5jNHRuS2hDM0tEcFpnMEZWc1ErcWwzY2pQRXlTditRaEtJd1BUZE5hNk5sMGtDR0FZOTQ2YThLNW5nRXlLUjZRWTNjVWlTb2NhZ2dhT20veG9wWjdhek9KWVl3TnFncDF2SDdLaGNvSEVlU0R2OGVLQW5TWWJQSmdna1dHSXl4MlFGVDJycTN1bHlVZ1hDKzhtQmVCc0d2d1kwNllBY0xyNElyWXFzc3hYMkxPNHZWQkxNYTEzSDBxMHA2SGFHUzJsVlJ5cEQ2YVlIR1ZQT29ZN0hrRmR5M3V6YzNIYTh1cEk2bm9qVFF4cXhOdXVsMDJTUldza29pZllxOFc4L2ZxVEpRNWlxYlk2S0tlOEVKcXZ0aHp3ZkdYUHZxNUswYkNYV2FBOUFmQ3dKZURNVlptUm93dVZkbFNHZURXRnhWeXVvWGZGbGpZeVNaeDNZUUcrbUQyKzBXL3ZzTUdxZGFMQnp1Y3dVamcxZGYreWJRY0prVG9vbWErZURjRGxDUjI1dm9YU3hhTWlZemlDQ09VZS9ZekNyVm9vTFBISHQvYWFQU2h1cktJVW9QcEh5OTMvK0N5aldXWDQ9";
var JWT_1 = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHJNRlJSYTBGQlVWQXZURzVxVDJwUmRXeFhZa2xQZVd0U2FqSXdiMmRrU0RWMlMxSnhWSEIyTjJWdE1qTjFTRTR2VFN0blJGcDJjMEZLVVVGNFRrRnBOVlJxTVc1dFpVSnVUVzlNYmtadmVrNVlZVGRvTmtOaFZXMVJWbWRNUkZOYWNGWmliemRyZHpZMU9YWnZha3B0TDJsaGFtSnJNMnQ0Vm5WRFdIUjRZelJUTHpsYWQxaHNjVGwyV1d4b2FrNVpaM28xVkhkdVYwNWFPVXRrYjFCbVZYVlBWa2Q1VGsxMlFXaFhaVFpXZUU5WVJuVklTMFZWVkM5T2RtSmtNblo2V0d4MWRXZDVWV05KVjFFeVIwWllUakJ0TW1wVk9ITlRTSGhWUm1SVFJ6TjRMek55ZHpkb1FUMDkja2V5cy0xIn0.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNDEwfQ.gN5RFwdXHbwOYRHvBnIOQM_RUkAAqn5_YPNNIZDVPED1SzWM0WSAbC5QSeVMtCFldowIgbZ1SPWWKAcM6McCLg";
var JWT_2 = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHFhMDluYTBGQlFWQXJlWFJUWVV4Q1FWRTNVVTlUVjBjMlVYbHBNMHBFVVUxTGNEaGxPSFZ6V25Od1NuQnJVSEZKV1ZadVNVRnZaMEl5YjJscFprZGFUMXB4ZDJWTVpsTTRhWEp4VEZwU05IRjNRbTgzV1VaVmEwdFBkRk5IYWxWS04ySnBNVTlWYUdoQk0zRk5Oakl6UkRGUlRreGFTRkF5UjNvNWJqbGlUVVU1YTFFMWRtUkZWalZ6TmxkM2FGWnVSbmx5ZWxORGExa3hWbGRrUjJRMWJGcFhUREZNUzJaTWNsUlhNWGh6U3pJNE5XbExVMVUyVVc1T1YzVktOWHBuUzNwNVR6bFlVWFpOVTFGNEsxbHpWVlUyYmpCdFVUbEVjMlZuZFRoUWFVeHZOa2huUFQwI2tleXMtMSJ9.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNjc2fQ.VTBlv53bTMET3h0hVdqn1ov5B9bTpj00-1xkDYAZGQmicPc7AcbtnpiJYyNryK79Jn4XHwARr0VfelHKjKvfYQ";
var JWT_3 = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwNlZteEZaWFkyT0dkU2FHWXZURE5rVEZoWmFGazFkME41WVU5VFpGSlVTVmxvVFVsc1NuQkthVlEwWmpsMWRtWmxRV2RVTUdKaUt6RmtPVFJqY1dST1pYQm5MMDlRY2pKWkszWnVOemRqYlRkbk5uazVabFJhVmpsNmRtdGxkQzh3Y2k4cmREZE1SRFZ6U2l0WlVGTjRRbE5vUkZCRWN6RkxURlpCV2tKNWMwTjVjMUExV21oUkx6ZFZPVTQ1UzNCQ05IUnRMMU5EYzFOSU5HWnVaa2RqVDFCTU5FZDZSM3B1UkdjelVFRlhMME52ZDBSa01XeG5TaTkyWlZaWlVtZEhNVmt2UjJrd05sVkljR2x4UWxscFVXcFhlbVJ1Wm1Nek5tRXdaV1kxYUVvd1dsVkJLelI1VWxwNGNtWjNURlY2UlZKeVdFaGhZMDk2TkVKdVluZG9SRXBWWVRWWVNXTldPWFZXTm5STk1YVTRkQzlFUVZKcVNWQk1VR3QwZFRkRlVERktlRXhMV25sWmJuRnhiVU5oSzBwSVlXUjRUWFo2YzFWVU9WUnZTV0Z4TVVOdk5FbzJRMkpIVjA5TFJ6ZHlablZNUlU5YVNGTnRMMUJsVWxKNFdtbFViek50VGpRMGNIRkRWbWRaZG1Zd1VtUTFhM0ZIWVdOMlpsVkNhVFpLVDBreloyRjJNVU5rUkZaV1QwWXlWMDR6VGpsVFpraFBlRFV3UW1GMVZGQk5WRWc0TTJzeWRWcHBOQ3RGWVd4cmRubHllakpsYjJNMU1rZ3hiME52Y2xad1VHNVpURWhzU0RoUEwzZGFhVFpYZVVsbllXczJZWFU0WTJJME4zbFdiMmhuZUc1aGJFNHJZVTUwU0ROUWQycE1ja0ZDT0ROTldEWmtaSFptTDNaVFdscHNWRTlLV1VaNFkxbERiVGs0TkU4eFZGVmtlVk5ZWVRKd09EZG9jR3BuT0ROdVpVVXdTR3BSYVZGUE9DdFZUMjEyUkM5Tk5YcDNSMUZMZHpKT1FXOVVUWGQyVjFOcFkwMVJLM1JZVFc1TlNEZDRWa2RqWVVkMk5YZE1TRkkxVjNkbU5Ib3pOakl5UzFGdlMwMXphMWxMWWtrMVpUZzJTUzh2YTFsT2RUQlFMMmxPVjA1Tk1qTmhVWGxPWmxGaE4weHlURGQ2Y2toM05GbHlXUzgxVUhoMk9HNXhOV3hSZERabFRuUlZVRTl6TWpKU00zaFVUeTkyWXpOM1UyRTFTMEZIU0dka1NXNUtNaTl3UVZBME1YazNZVXBNZFZvNFpVWmljVVIwYVRRMGJXVXZlVzlJYzJ4WmRrTnVTWEkzVXpObWMycG1MMFpQVVRkTlpqTkRkSEJaTDI4dlQyZ3lheThyYzBkbVVGSnFRM05MTTJkSkwyUk1XR1kzVDJaTlFVMU5aamN6ZURVeldtb3hPVXg1TVhONE1sWmpSM2haV1dGV1kyOU5hRVpMVTNrNGMwWlpaR1I0ZDFRM2JXSnpRMlJvSzFjeVZHeGFRemN3VlZodFNEWTFVR0p0T1VKNFEwbDBlalJ3UzJVME5IWkJVR0ZvUkZjdlVUWnJUWGw2VkUxNlZWVnhXVXBPYWxSSVl6RlBkSGxJTTNGdVZVSTNXVUZ4Vm1aRU1IQk1TRzVHZWtwTmJXOWxOVEZJYVhKTWJ6WXJRemRSY2sxTmN6RkZUM0Z3YW1wNFNYZFlUbFZ5TlROV1VFaE5UVUV5TjBsc1ZXVldaM3A1WVhWdVdUZzNlV3c0VjB4cFIxaE9jMVZaWVN0d1lXd3pXa2hvVlZZMk0ya3hkbUo0ZGpSRVdWZFZTbFpqT0VabVdIRktVbVZoUzFkemNubDVWM2g2TW5KUmMzTllTbFpEZHpCNFVYcGhUa1JTUjB4cVdGZDRTMDFrWlRGM1REUlZSelZ2YUdWc1pWQnRRa1o1TWtsQlYyb3JZMmg2V21wRlVERlRia2RJYm5WV1YzazVaR3AyVW1SUGRGRlZVMlk0WWtkaWJqRkhWamR6WTJoSFpHeElaRkp1ZEZSM1FUZG5MMUJPVlZCYVZrTkxPWGRSZVhkS2QwVkJPRFJsWmtGaFRWSnljR2hrYUc1c1Ywc3ZPQ3MwYms5amJURnJla1Z6VG14RFJsWnZkbmhUTjFSYU9FNXJjV1ZEUlN0dllYcDRUbFozUW1JNVpXSnNTRlJyZDNwWVdtczBZVTU1ZGxoRmFVaHJkazkxUms4MmNHOHpjaXRpY1U1eVZYVTJNM0paTjA5RFdYRmhSbTV0ZFc4MFQzVkJSV2xJTjNSNVRrUkpjMHhKWVRkWFZVcDFPVlJPUlhScGVtVmxha3hVVVhWa2VHNVlWU3QxYUc5R1YxbFViWGxYZVdrck5IUjBSVzVCV1hwWGVETXpjRUZqY25kMWRqaDNaMWQwV0ZKNVVXRjNZWGsxZWtscFYzQlFPRTVpYWt4WlQyZFNlRmszYkdSdU1taGlNVTl0VHpocFVFUnNTVzFQTTFaWE5FeEJUa3hoTDFnM01WbDVNREJUYlhBdlMzRnBNWEJRTWtNM1dtbEZNbmN5VWxaaE5IbHdURzlVWldKTVV6STJVRWNyWkRaelptVkdVWFZMYlhCc05XbE9TWEJvUzNnMVkwMDFhbXMyYjB4Q056QkNkRzFyVjAxWllVTldWa2RXVEVSQ2VVZ3JiR1JxZDJZeFdtSktMeTh2TWxSSlJDdHBkelpuTDBacE9YaHNiMlphVEVodmJXaE1VRlJLVmtabFdIUmxRakZ3WVdoMVpsUlRPWEk0WTB0aFprSjVZMU5tU1hWVldDc3pLMGxHUkU0MVVUVXlTMDF1VVRBemIxVjFRMDFPVFhOWFJ6Y3pNamxLUkZaMlpHczVkMnhxUnpWSVVFVm5Xa3g0Wkdka05qUkpSbmxOTkM5aGFqaE9ORmxKWms1SE5FVlFXVEpFYjI1SWEySlVTamsyUkd4eFEweE1ZMkZ5ZG5aSldXeDJSRXBsTVZseVRVNTRNR05hYm5GWFdUaHVlbTlsZVdFMWNGVlFNRU5JZVhCSmEyODRjbWRaYWtaU2RITkVVemhFVlZaM1dFRlFaVWxzVW1Sa05UbE5SbmhOYmpad05tUjBTbmhvYlV4YVVtOXpUVE40YjFsclFYQmlSSGRNYVRnM1MzTmlSSGRvZUdSemFuRkRXSGx4YTJWMk9VdGlOR3BVUkV4clJqVnhWemhUWnpOR0sxbEdhbU5KUWxKa01VczRUbEZrZFdkc1Z6UjJSSEF5TVRKWFRrYzBNazkyUWsxd1RHSmpWazVqTkhSdVMyaERNMHRFY0Zwbk1FWldjMUVyY1d3elkycFFSWGxUZGl0UmFFdEpkMUJVWkU1aE5rNXNNR3REUjBGWk9UUTJZVGhMTlc1blJYbExValpSV1ROalZXbFRiMk5oWjJkaFQyMHZlRzl3V2pkaGVrOUtXVmwzVG5GbmNERjJTRGRMYUdOdlNFVmxVMFIyT0dWTFFXNVRXV0pRU21kbmExZEhTWGw0TWxGR1ZESnljVE4xYkhsVloxaERLemh0UW1WQ2MwZDJkMWt3TmxsQlkweHlORWx5V1hGemMzaFlNa3hQTkhaV1FreE5ZVEV6U0RCeE1IQTJTR0ZIVXpKc1ZsSjVjRVEyWVZsSVIxWlFUMjlaTjBoclJtUjVNM1Y2WXpOSVlUaDFjRWsyYm05cVZGRjRjWGhPZFhWc01ESlRVbGR6YTI5cFpsbHhPRmM0TDJaeFZFcFJOV2x4WWxrMlMwdGxPRVZLY1haMGFIcDNaa2RZVUhaeE5Vc3dZa05ZVjJGQk9VRm1RM2RLWlVSTlZscHRVbTkzZFZaa2JGTkhaVVJYUm5oV2VYVnZXR1pHYkdwWmVWTmFlRE5aVVVjcmJVUXlLekJYTDNaelRVZHhaR0ZNUW5wMVkzZFZhbWN4WkdZcmVXSlJZMHByVkc5dmJXRXJaVVJqUkd4RFVqSTFkbTlZVTNoaFRXbFplbWxEUTA5VlpTOVpla055Vm05dlRGQklTSFF2WVdGUVUyaDFja3RKVlc5UWNFaDVPVE12SzBONWFsZFhXRFE5I2tleXMtMSJ9.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA3MTM0MzM2fQ.JpBbBBD3TzybhJgNSYF1dmlWF-mlBEKOIJbR_Zv0bqpQSufTZbwSrWXzHRCHVZej9cMusPdAh6VZHjgrIRkk1__i5rJc2FGhPp8M6RZ4BCfthrQokQWP3D2MdJAmuhli61NPkEk2R_ZfCjmTdZG5okbDhsnqp4oKQ-VHGf0Ki3lMTudqRiOaCBPU7lB6AcXGgiRCsr4wbLt0_9bJPDIdd4JoND61jb7TBzpgD6sd_EI6R2-ZRwGTWK-6OjCXyYdMzGiOfsYkYyuqbdXjzhhsWEFOSjng6mwe_YjND8HDP5AQ-5qS6dEnFCDU9jyXpM6ecAwMum0iuhlz_a1Bze-dEg";
var JWK_1 = {
    kty: "EC",
    kid: "FPsTzIzibaXH39qMwp-IJ4Ekm-rZcdgmQhN5OKusveI",
    alg: "ES256",
    crv: "P-256",
    x: "7JUDBaEqZ9Vag6_3eZ5DU4YLzxueRk0uHjVUEe8L6cQ",
    y: "REYx1hSyContjAiwg04ZJrNXmNQDMeClXTrzcSNwjkM",
    d: "KVqyXXDtmSYaakBvHgDWZyubxG8V4x5KCdlBoyhek3c",
};
var JWK_2 = {
    kty: "EC",
    kid: "ewAlCPBzxWBJalQaeRyV8JoiaIWA9Q08I5TSrEvYfW0",
    alg: "ES256",
    crv: "P-256",
    x: "v3m6Op70FQGDPa9IRhTjMVu9bJHILRmXjkq3GgU6pLo",
    y: "zHVYGf8r1KPxbwwgVOih_N1KTeMLt8uoaLBgG03UpB0",
    d: "RBGAajC2mBVoB9aLG0HJgn1eBz7lqw0PYq8bMjolQHs",
};
describe("DID JWT Tests", function () {
    var jwk1;
    var jwk2;
    var jwk3;
    var rootCert;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var certKeyPem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_jose_1.JWK.asKey(JWK_1)];
                case 1:
                    jwk1 = _a.sent();
                    return [4 /*yield*/, node_jose_1.JWK.asKey(JWK_2)];
                case 2:
                    jwk2 = _a.sent();
                    certKeyPem = fs_1.default.readFileSync(path_1.default.join(__dirname, "certs/cert1/cert1.key"));
                    return [4 /*yield*/, node_jose_1.JWK.asKey(certKeyPem, "pem")];
                case 3:
                    jwk3 = _a.sent();
                    rootCert = node_forge_1.pki.certificateFromPem(fs_1.default.readFileSync(path_1.default.join(__dirname, "certs/cert1/root.crt")).toString());
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create jwt", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signer, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = new signers_1.NodeJwtSigner(jwk1);
                    return [4 /*yield*/, main_1.DIDJwt.sign({ name: "anonymous" }, signer, {
                            //  issuer: DID,
                            keyid: util_1.default.format("%s#keys-1", DID),
                            algorithm: "ES256",
                        })];
                case 1:
                    jwt = _a.sent();
                    chai_1.assert.isNotNull(jwt);
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification pass", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, verificationResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_1)];
                case 1:
                    verificationResult = _a.sent();
                    chai_1.expect(verificationResult).eql({
                        issuer: "did:jwk:ZUp3bGprMFRRa0FBUVAvTG5qT2pRdWxXYklPeWtSajIwb2dkSDV2S1JxVHB2N2VtMjN1SE4vTStnRFp2c0FKUUF4TkFpNVRqMW5tZUJuTW9MbkZvek5YYTdoNkNhVW1RVmdMRFNacFZibzdrdzY1OXZvakptL2lhamJrM2t4VnVDWHR4YzRTLzlad1hscTl2WWxoak5ZZ3o1VHduV05aOUtkb1BmVXVPVkd5Tk12QWhXZTZWeE9YRnVIS0VVVC9OdmJkMnZ6WGx1dWd5VWNJV1EyR0ZYTjBtMmpVOHNTSHhVRmRTRzN4LzNydzdoQT09",
                        payload: { name: "anonymous", iat: 1605571410 },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    // Verify with x5c
    // Verification should fail
    it("JWT verification should throw invalid signature error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_2)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    chai_1.assert.equal(err_1.message, "invalid signature");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification should throw invalid issuer error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_1)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    chai_1.assert.isNotNull(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("Should create jwt with x5c", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signer, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = new signers_1.NodeJwtSigner(jwk3);
                    return [4 /*yield*/, main_1.DIDJwt.sign({ name: "anonymous" }, signer, {
                            //  issuer: DID,
                            keyid: util_1.default.format("%s#keys-1", DID_3),
                            algorithm: "RS256",
                        })];
                case 1:
                    jwt = _a.sent();
                    chai_1.assert.isNotNull(jwt);
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT signed by cert should pass", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, caStore, verificationResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    caStore = node_forge_1.pki.createCaStore([rootCert]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_3, caStore)];
                case 1:
                    verificationResult = _a.sent();
                    chai_1.expect(verificationResult).to.eql({
                        issuer: "did:jwk:ZUp6VmxFZXY2OGdSaGYvTDNkTFhZaFk1d0N5YU9TZFJUSVloTUlsSnBKaVQ0Zjl1dmZlQWdUMGJiKzFkOTRjcWROZXBnL09QcjJZK3ZuNzdjbTdnNnk5ZlRaVjl6dmtldC8wci8rdDdMRDVzSitZUFN4QlNoRFBEczFLTFZBWkJ5c0N5c1A1WmhRLzdVOU45S3BCNHRtL1NDc1NINGZuZkdjT1BMNEd6R3puRGczUEFXL0Nvd0RkMWxnSi92ZVZZUmdHMVkvR2kwNlVIcGlxQllpUWpXemRuZmMzNmEwZWY1aEowWlVBKzR5Ulp4cmZ3TFV6RVJyWEhhY096NEJuYndoREpVYTVYSWNWOXVWNnRNMXU4dC9EQVJqSVBMUGt0dTdFUDFKeExLWnlZbnFxbUNhK0pIYWR4TXZ6c1VUOVRvSWFxMUNvNEo2Q2JHV09LRzdyZnVMRU9aSFNtL1BlUlJ4WmlUbzNtTjQ0cHFDVmdZdmYwUmQ1a3FHYWN2ZlVCaTZKT0kzZ2F2MUNkRFZWT0YyV04zTjlTZkhPeDUwQmF1VFBNVEg4M2sydVppNCtFYWxrdnlyejJlb2M1Mkgxb0NvclZwUG5ZTEhsSDhPL3daaTZXeUlnYWs2YXU4Y2I0N3lWb2hneG5hbE4rYU50SDNQd2pMckFCODNNWDZkZHZmL3ZTWlpsVE9KWUZ4Y1lDbTk4NE8xVFVkeVNYYTJwODdocGpnODNuZUUwSGpRaVFPOCtVT212RC9NNXp3R1FLdzJOQW9UTXd2V1NpY01RK3RYTW5NSDd4VkdjYUd2NXdMSFI1V3dmNHozNjIyS1FvS01za1lLYkk1ZTg2SS8va1lOdTBQL2lOV05NMjNhUXlOZlFhN0xyTDd6ckh3NFlyWS81UHh2OG5xNWxRdDZlTnRVUE9zMjJSM3hUTy92YzN3U2E1S0FHSGdkSW5KMi9wQVA0MXk3YUpMdVo4ZUZicUR0aTQ0bWUveW9Ic2xZdkNuSXI3UzNmc2pmL0ZPUTdNZjNDdHBZL28vT2gyay8rc0dmUFJqQ3NLM2dJL2RMWGY3T2ZNQU1NZjczeDUzWmoxOUx5MXN4MlZjR3hZWWFWY29NaEZLU3k4c0ZZZGR4d1Q3bWJzQ2RoK1cyVGxaQzcwVVhtSDY1UGJtOUJ4Q0l0ejRwS2U0NHZBUGFoRFcvUTZrTXl6VE16VVVxWUpOalRIYzFPdHlIM3FuVUI3WUFxVmZEMHBMSG5GekpNbW9lNTFIaXJMbzYrQzdRck1NczFFT3Fwamp4SXdYTlVyNTNWUEhNTUEyN0lsVWVWZ3p5YXVuWTg3eWw4V0xpR1hOc1VZYStwYWwzWkhoVVY2M2kxdmJ4djREWVdVSlZjOEZmWHFKUmVhS1dzcnl5V3h6MnJRc3NYSlZDdzB4UXphTkRSR0xqWFd4S01kZTF3TDRVRzVvaGVsZVBtQkZ5MklBV2orY2h6WmpFUDFTbkdIbnVWV3k5ZGp2UmRPdFFVU2Y4YkdibjFHVjdzY2hHZGxIZFJudFR3QTdnL1BOVVBaVkNLOXdReXdKd0VBODRlZkFhTVJycGhkaG5sV0svOCs0bk9jbTFrekVzTmxDRlZvdnhTN1RaOE5rcWVDRStvYXp4TlZ3QmI5ZWJsSFRrd3pYWms0YU55dlhFaUhrdk91Rk82cG8zciticU5yVXU2M3JZN09DWXFhRm5tdW80T3VBRWlIN3R5TkRJc0xJYTdXVUp1OVRORXRpemVlakxUUXVkeG5YVSt1aG9GV1lUbXlXeWkrNHR0RW5BWXpXeDMzcEFjcnd1djh3Z1d0WFJ5UWF3YXk1eklpV3BQOE5iakxZT2dSeFk3bGRuMmhiMU9tTzhpUERsSW1PM1ZXNExBTkxhL1g3MVl5MDBTbXAvS3FpMXBQMkM3WmlFMncyUlZhNHlwTG9UZWJMUzI2UEcrZDZzZmVGUXVLbXBsNWlOSXBoS3g1Y001ams2b0xCNzBCdG1rV01ZYUNWVkdWTERCeUgrbGRqd2YxWmJKLy8vMlRJRCtpdzZnL0ZpOXhsb2ZaTEhvbWhMUFRKVkZlWHRlQjFwYWh1ZlRTOXI4Y0thZkJ5Y1NmSXVVWCszK0lGRE41UTUyS01uUTAzb1V1Q01OTXNXRzczMjlKRFZ2ZGs5d2xqRzVIUEVnWkx4ZGdkNjRJRnlNNC9hajhONFlJZk5HNEVQWTJEb25Ia2JUSjk2RGxxQ0xMY2FydnZJWWx2REplMVlyTU54MGNabnFXWThuem9leWE1cFVQMENIeXBJa284cmdZakZSdHNEUzhEVVZ3WEFQZUlsUmRkNTlNRnhNbjZwNmR0SnhobUxaUm9zTTN4b1lrQXBiRHdMaTg3S3NiRHdoeGRzanFDWHlxa2V2OUtiNGpURExrRjVxVzhTZzNGK1lGamNJQlJkMUs4TlFkdWdsVzR2RHAyMTJXTkc0Mk92Qk1wTGJjVk5jNHRuS2hDM0tEcFpnMEZWc1ErcWwzY2pQRXlTditRaEtJd1BUZE5hNk5sMGtDR0FZOTQ2YThLNW5nRXlLUjZRWTNjVWlTb2NhZ2dhT20veG9wWjdhek9KWVl3TnFncDF2SDdLaGNvSEVlU0R2OGVLQW5TWWJQSmdna1dHSXl4MlFGVDJycTN1bHlVZ1hDKzhtQmVCc0d2d1kwNllBY0xyNElyWXFzc3hYMkxPNHZWQkxNYTEzSDBxMHA2SGFHUzJsVlJ5cEQ2YVlIR1ZQT29ZN0hrRmR5M3V6YzNIYTh1cEk2bm9qVFF4cXhOdXVsMDJTUldza29pZllxOFc4L2ZxVEpRNWlxYlk2S0tlOEVKcXZ0aHp3ZkdYUHZxNUswYkNYV2FBOUFmQ3dKZURNVlptUm93dVZkbFNHZURXRnhWeXVvWGZGbGpZeVNaeDNZUUcrbUQyKzBXL3ZzTUdxZGFMQnp1Y3dVamcxZGYreWJRY0prVG9vbWErZURjRGxDUjI1dm9YU3hhTWlZemlDQ09VZS9ZekNyVm9vTFBISHQvYWFQU2h1cktJVW9QcEh5OTMvK0N5aldXWDQ9",
                        payload: { name: "anonymous", iat: 1607134336 },
                        issuerDomainName: "example.org",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
/*
describe("DID JWT Tests", () => {
  let jwk1: JWK.Key;
  let jwk2: JWK.Key;

  let did1: DidJwk;
  let did2: DidJwk;

  let signer1: JwtSigner;
  let signer2: JwtSigner;

  let jwt: string;
  let resolver: Resolver;

  before(async () => {
    jwk1 = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk1.json")));
    jwk2 = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk2.json")));

    did1 = new DidJwk(jwk1);
    did2 = new DidJwk(jwk2);

    signer1 = new NodeJwtSigner(jwk1);
    signer2 = new NodeJwtSigner(jwk2);

    const jwkResolver = getResolver();
    resolver = new Resolver({
      jwk: jwkResolver
    });
  });

  it("Should create a JWT without an exception", () => {
    assert.doesNotThrow(async () => {
      jwt = await DIDJwt.sign({ "name": "anonymous" }, signer1, {
        issuer: did1.getDidUri(),
        keyid: "keys-1",
        algorithm: "ES256"
      });

      assert.isNotNull(jwt);
    });
  });

  it("JWT verification against the right issuer should pass", async () => {
    const result = await DIDJwt.verify(resolver, jwt, did1.getDidUri());

    expect(result["iss"]).equal(did1.getDidUri());
  });

  it("JWT verification against the wrong issuer should faild", async () => {
    var error = null

    try {
      await DIDJwt.verify(resolver, jwt, did2.getDidUri());
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error["name"]).equal("JsonWebTokenError");
  });

  it("JWT verification against a null issuer should fail", async () => {
    var error = null;

    try {
      await DIDJwt.verify(resolver, jwt, null);
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });

  it("JWT verification against an undefined issuer should fail", async () => {
    var error = null;
    try {
      await DIDJwt.verify(resolver, jwt, undefined);
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });

  it("JWT verification against a undefined unsupported should fail", async () => {
    var error = null;
    try {
      await DIDJwt.verify(resolver, jwt, "did:example:1234");
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });
});*/
