import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

export const createHederaClient = () => {
  const accountId = import.meta.env.VITE_HEDERA_ACCOUNT_ID;
  const privateKey = import.meta.env.VITE_HEDERA_PRIVATE_KEY;
  if (!accountId || !privateKey) throw new Error("Missing Hedera credentials");
  return Client.forTestnet().setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));
};
