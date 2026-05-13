import type { IProvider } from '@web3auth/modal';
import { type Payment, convertStringToHex, xrpToDrops } from 'xrpl';

async function fetchAccountInfo(
  provider: IProvider,
): Promise<Record<string, Record<string, string> | undefined> | string> {
  const accounts = await provider.request<never, string[]>({
    method: 'xrpl_getAccounts',
  });
  const [account] = accounts ?? [];
  if (!account) {
    return 'No accounts found, please report this issue.';
  }
  return (await provider.request({
    method: 'account_info',
    params: [
      {
        account,
        strict: true,
        ledger_index: 'current',
        queue: true,
      },
    ],
  })) as Record<string, Record<string, string> | undefined>;
}

export async function getAccounts(provider: IProvider): Promise<unknown> {
  try {
    return await fetchAccountInfo(provider);
  } catch (error) {
    console.error('Error', error);
    return error;
  }
}

export async function getBalance(provider: IProvider): Promise<unknown> {
  try {
    const accInfo = await fetchAccountInfo(provider);
    if (typeof accInfo === 'string') return accInfo;
    return accInfo.account_data?.Balance;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
}

export async function signMessage(provider: IProvider): Promise<unknown> {
  try {
    const msg = 'Hello world';
    const hexMsg = convertStringToHex(msg);
    const txSign = await provider.request<object, never>({
      method: 'xrpl_signMessage',
      params: {
        message: hexMsg,
      },
    });
    return txSign;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
}

export async function signAndSendTransaction(provider: IProvider): Promise<unknown> {
  try {
    const accounts = await provider.request<never, string[]>({
      method: 'xrpl_getAccounts',
    });

    const [account] = accounts ?? [];
    if (account) {
      const tx: Payment = {
        TransactionType: 'Payment',
        Account: account,
        Amount: xrpToDrops(2),
        Destination: 'raYzhtCitpdZivyVN2XBj2xvHKSmBjft2n',
      };
      const txSign = await provider.request({
        method: 'xrpl_submitTransaction',
        params: {
          transaction: tx,
        },
      });
      return txSign;
    } else {
      return 'failed to fetch accounts';
    }
  } catch (error) {
    console.error('Error', error);
    return error;
  }
}
