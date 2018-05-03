import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

export const getPartyBranchList = () => fetch('/branch_flags');

export const getPartyBranch = id => fetch('/branch_flags/' + id);